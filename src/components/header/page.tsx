'use client';
import React, { useState } from 'react';
import './header.css';
import { getCookie } from 'cookies-next';
import { FaUserCircle } from "react-icons/fa";
import { TbExternalLink } from "react-icons/tb";

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);
  const email = getCookie('userEmail');
  const userName = getCookie('userName');

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <header className='header-container'>
      <div className='header-content'>
        <h1 className='logo'>FX <strong className='trading'>AUTO</strong></h1>

        <div className="desktop-nav">
          <div className="nav-links-container">
            <div className="nav-links">
              <a className="nav-link" href="/">
                Home <TbExternalLink className="link-icon" />
              </a>
              <a className="nav-link" href="https://charts.xhed.net/">
                Charts <TbExternalLink className="link-icon" />
              </a>
              <a className="nav-link" href="/producttour">
                Product Tour <TbExternalLink className="link-icon" />
              </a>
              <a className="nav-link" href="/contactus">
                Contact Us <TbExternalLink className="link-icon" />
              </a>
              <a className="nav-link" href="/aboutus">
                About Us <TbExternalLink className="link-icon" />
              </a>
            </div>
          </div>

          <div className="user-section">
            {email ? (
              <div className="user-info">
                <FaUserCircle className="user-icon" />
                <div className="user-details">
                  <h2 className='user-name'>{userName}</h2>
                  <p className='user-email'>{email}</p>
                </div>
              </div>
            ) : (
              <div className="mobile-cta-container">
                <button
                  className="cta-button"
                  onClick={() => {
                    window.location.href = "/?autoLogin=true";
                  }}
                >
                  Start Trading with Us
                </button>
                <div className={`menu-icon ${showLinks ? 'change' : ''}`} onClick={toggleLinks}>
                  <div className="bar bar1"></div>
                  <div className="bar bar2"></div>
                  <div className="bar bar3"></div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={`mobile-nav ${showLinks ? 'mobile-show' : ''}`}>
          <div className="links-container">
            <a className="nav-link" href="/">
              Home <TbExternalLink className="link-icon" />
            </a>
            <a className="nav-link" href="https://charts.xhed.net/">
              Charts <TbExternalLink className="link-icon" />
            </a>
            <a className="nav-link" href="/producttour">
              Product Tour <TbExternalLink className="link-icon" />
            </a>
            <a className="nav-link" href="/contactus">
              Contact Us <TbExternalLink className="link-icon" />
            </a>
            <a className="nav-link" href="/aboutus">
              About Us <TbExternalLink className="link-icon" />
            </a>
            <p className='copyright'>&#169;JED 2024</p>
          </div>
        </div>
      </div>
    </header>
  );
}