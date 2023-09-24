import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./MysteriousPage.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';

import { auth } from "./firebase"; // Import the auth instance from your firebase.js file
import { getDatabase, ref as databaseRef, push as pushToDatabase } from "firebase/database";
import { serverTimestamp } from "firebase/database";

function MysteriousPage() {
  const [user] = useAuthState(auth);

  const handlePlaceSelect = (place) => {
    // Extract the selected place details (e.g., place.name, place.geometry.location)
    // Update your state or form data with the selected place information
    setFormData({
      ...formData,
      full_name: place.name,
      // You can add more fields as needed
    });
  };

  
  const [formData, setFormData] = useState({
    full_name: "",
    date: null,
    secondDate: null,
    difficulty_level: "",
  });

  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      date: date,
    });
  };

  const handleSecondDateChange = (date) => {
    setFormData({
      ...formData,
      secondDate: date,
    });
  };

  const handleDifficultyChange = (e) => {
    const difficultyLevel = e.target.value;
    setFormData({
      ...formData,
      difficulty_level: difficultyLevel,
    });
  };

  // Function to check if the form is valid
  const checkFormValidity = () => {
    const { full_name, date, difficulty_level } = formData;
    return full_name.trim() !== "" && date !== null && difficulty_level !== "";
  };

  // Function to update form validity
  const updateFormValidity = () => {
    setIsFormValid(checkFormValidity());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const currentDate = new Date();
        if (formData.date && formData.date < currentDate) {
          console.error("Journey start date cannot be in the past.");
          return;
        }

        const database = getDatabase();
        const adventuresRef = databaseRef(database, "adventures");

        const startDate = formData.date ? serverTimestamp() : null;
        const endDate = formData.secondDate ? serverTimestamp() : null;

        const adventureData = {
          full_name: formData.full_name,
          date: startDate,
          secondDate: endDate,
          difficulty_level: formData.difficulty_level,
          user_name: user.displayName,
          user_uid: user.uid,
        };

        const newAdventureRef = pushToDatabase(adventuresRef, adventureData);

        setFormData({
          full_name: "",
          date: null,
          secondDate: null,
          difficulty_level: "",
        });

        console.log("Data saved to Firebase");

        // Redirect to the AfterSubmitPage after successful submission
       // Replace "/after-submit" with your actual route
      } else {
        console.error("User is not authenticated.");
      }
    } catch (error) {
      console.error("Error saving data to Firebase:", error);
    }
  };

  return (
    <div className="form-main">
      <div className="main-wrapper">
        <h2 className="form-head">Adventure</h2>
        <form className="form-wrapper" onSubmit={handleSubmit}>
          <div className="form-card">
            <input
              className="form-input"
              type="text"
              name="full_name"
              required="required"
              value={formData.full_name}
              onChange={handleInputChange}
              onBlur={updateFormValidity} 
            />
            <label className="form-label" htmlFor="full_name">
              Starting Location
            </label>
          </div>

          <div className="form-card">
            <label className="form-label" htmlFor="difficulty_level"></label>
            <select
              className="form-input"
              name="difficulty_level"
              value={formData.difficulty_level}
              onChange={handleDifficultyChange}
              onBlur={updateFormValidity}
            >
              <option value="" className="change-color">
                Select Difficulty
              </option>
              <option value="easy" className="change-color">
                Easy
              </option>
              <option value="difficult" className="change-color">
                Difficult
              </option>
              <option value="hard" className="change-color">
                Hard
              </option>
            </select>
          </div>

          <div className="form-card">
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              className="form-input"
              dateFormat="dd/MM/yyyy"
              placeholderText="Journey Starts"
              onBlur={updateFormValidity} 
            />
          </div>

          <div className="form-card">
            <DatePicker
              selected={formData.secondDate}
              onChange={handleSecondDateChange}
              className="form-input"
              dateFormat="dd/MM/yyyy"
              placeholderText="Journey Ends"
              onBlur={updateFormValidity}
            />
          </div>

          <div className="btn-wrap">
            <Link to="/upload-photo">
              <button type="submit" disabled={!isFormValid}>
                Submit
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MysteriousPage;
