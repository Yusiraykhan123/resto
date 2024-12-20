
import React from 'react';
import './App.css';

function Navbar() {
  return (
    <div className="navbar">
      <a href="/menus">Menus</a>
      <a href="/profile">Profile</a>
      <a href="/categories">Categories</a>
      <a href="/faq">FAQ</a>
      <a href="/opening-hours">Opening Hours</a>
    </div>
  );
}

export default Navbar;
