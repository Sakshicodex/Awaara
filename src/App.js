
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';


import Hero from './components/hero.jsx';
import Home from'./components/home.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';
import Trips from './components/Trips.jsx';
import Login from './components/LoginComponent.jsx';
import MysteriousPage from './components/MysteriousPage.jsx';
import Layout from './components/Layout.jsx';
import AfterSubmit from './components/AfterSubmit.jsx';


function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Routes>
        <Route path="/" element={<Hero />} /> {/* Specify the Home component */}
        <Route path="/home" element={<Home />} /> 
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/trips" element={<Trips/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login/>} />

        <Route path="/mysterious-page" element={<MysteriousPage></MysteriousPage>} />
        <Route path="/upload-photo" element={<AfterSubmit></AfterSubmit>} />

        

          {/* Add more routes for other pages if needed */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
