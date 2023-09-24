import React, { useState } from 'react';
import './AfterSubmit.css';
import { storage } from './firebase'; // Import 'storage' from your Firebase configuration file
import { ref, uploadBytesResumable } from 'firebase/storage'; // Import 'ref' and 'uploadBytesResumable' from Firebase Storage

const AfterSubmit = () => {
  const [file, setFile] = useState(null);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const storageRef = ref(storage, 'users/'); // Replace with your desired storage path
      const uploadTask = uploadBytesResumable(storageRef, file);

      // Set up an observer to track the upload progress
      uploadTask.on('state_changed',
        (snapshot) => {
          // You can track the progress here if needed
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          // Handle errors here
          console.error('Error uploading file:', error);
        },
        () => {
          // Handle a successful upload here
          console.log('File uploaded successfully!');
          setUploadComplete(true); // Set the state to indicate upload completion
        }
      );
    }
  };

  // Render a congratulatory message after successful upload
  if (uploadComplete) {
    return (
      <div className='FULLPAGE'>
        <div className='box-container'>
          <div className='description-box'>
            <h2 className='awaaraabout'>Congratulations!</h2>
            <p>You have reached your destination.</p>
            <p>Explore and enjoy the place.</p>
          </div>
        </div>
      </div>
    );
  }

  // Render the file upload section if upload is not complete
  return (
    <div className='FULLPAGE'>
      <div className='box-container'>
        <div className='description-box'>
          <h2 className='awaaraabout'>CLUES SECTION</h2>
          <p className='Clue'>
            In August's glow,
            <br />
            I stand with pride
          </p>
          <hr />
          <p className='afclue'>If you Reached Upload A Selfie</p>
          <hr /> {/* Horizontal line */}
          {/* File upload section */}
          <div className='upload-photo'>
            <label className='custom-file-label' htmlFor='file-input'>
              Upload Selfie:-
              <br />
            </label>
            <input
              type='file'
              accept='image/*'
              id='file-input'
              className='btn'
              onChange={handleFileChange}
            />
            <button onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AfterSubmit;
