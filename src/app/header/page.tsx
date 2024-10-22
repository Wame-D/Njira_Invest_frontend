'use client';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import Image from 'next/image';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
    const menuIcon = document.querySelector('.menu-icon');
    const bars = document.querySelectorAll('.bar');

    if (menuIcon !== null) {
      menuIcon.classList.toggle("change");
    }
    bars.forEach(bar => bar.classList.toggle("change"));
  };

  return (
    <div className='header'>
      <h1 className='logo'>XHED</h1>
      <div className={`menu-icon ${showLinks ? 'change' : ''}`} onClick={toggleLinks}>
        <span id='menu'>
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </span> {/* This is the hamburger menu icon */}
      </div>
      {showLinks && (
        <div className='new-links'>
          <a className="links" href="/">
            <FontAwesomeIcon icon={faAngleRight} className="my-icon11" />Home
          </a>
          <a className="links" href="/Contact">
            <FontAwesomeIcon icon={faAngleRight} className="my-icon11" />Contacts
          </a>
          <a className="links" href="/aboutus">
            <FontAwesomeIcon icon={faAngleRight} className="my-icon11" />About Us
          </a>
          <a className="links" href="/products">
            <FontAwesomeIcon icon={faAngleRight} className="my-icon11" />Projects
          </a>
          <a className="links" href="/Auth">
            <FontAwesomeIcon icon={faAngleRight} className="my-icon11" />Admin
          </a>

          <p id='copyright'>&#169;JED 2024</p>
        </div>
      )}
      <div className='nav-links'>
        <a className="links" href="../">Home  </a>
        <a className="links" href="/aboutus">About Us</a>
        <a className="links" href="/products">Projects</a>
        <a className="links" href="/Auth">Admin</a>
      </div>
      <div className='about-link in-header2'>
        <a className="about-li" href="/Contact">Get in Touch</a>
      </div>
    </div>
  );
}
