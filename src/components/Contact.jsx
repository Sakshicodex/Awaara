import React, { useState } from 'react';
import styles from './Contact.module.css'; // Import your CSS module

const Contact = () => {
  // Create state variables to store form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can perform actions like sending the form data to a server or displaying it.
    console.log(formData);
  };

  return (
    <div className={`${styles.center} ${styles.boxContainerUnique}`}>
      <h2>Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formsGroupUnique}>
          <label className={styles.userUnique} htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formsGroupUnique}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formsGroupUnique}>
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.formsGroupUnique}>
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Contact;
