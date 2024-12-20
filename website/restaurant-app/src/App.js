import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Menus from "./components/Menus";
import Profile from "./components/Profile";
import Categories from "./components/Categories";
import FAQ from "./components/FAQ";
import OpeningHours from "./components/OpeningHours";
import Testimonials from "./components/Testimonials";
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <a href="/menus">Menus</a>
          <a href="/profile">Profile</a>
          <a href="/categories">Categories</a>
          <a href="/faq">FAQ</a>
          <a href="/opening-hours">Opening Hours</a>
          <a href="/testimonials">Testimonials</a>
        </nav>
        <Routes>
          <Route path="/menus" element={<Menus />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/opening-hours" element={<OpeningHours />} />
          <Route path="/testimonials" element={<Testimonials />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
