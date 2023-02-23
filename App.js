import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home"
import Footer from "./components/Footer";
import Contact from "./components/Contact"
import Services from "./components/Services";

import "./styles/App.scss"
import "./styles/Header.scss"
import "./styles/home.scss"
import "./styles/Footer.scss"
import "./styles/contact.scss"
const app = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}></Route>
      </Routes>
 
      <Footer/>
    </Router>
  );
};

export default app;