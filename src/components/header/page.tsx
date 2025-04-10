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
    const menuIcon = document.querySelector('.menu-icon');
    const bars = document.querySelectorAll('.bar');

    if (menuIcon !== null) {
      menuIcon.classList.toggle("change");
    }
    bars.forEach(bar => bar.classList.toggle("change"));
  };

  return (
    <div className='px-4 header'>
      <h1 className='logo'>FX <strong className='trading'>AUTO</strong></h1>

      <div className={`menu-icon ${showLinks ? 'change' : ''}`} onClick={toggleLinks}>
        <span id='menu'>
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
        </span>
      </div>

      {showLinks && (
        <div className='new-links'>
          <a className="links flex flex-row" href="/">
            Home <TbExternalLink className="my-icon11" />
          </a>
          <a className="links flex flex-row" href="https://charts.xhed.net/">
            Charts <TbExternalLink className="my-icon11" />
          </a>
          <a className="links flex flex-row" href="/producttour">
            Product Tour <TbExternalLink className="my-icon11" />
          </a>
          <a className="links flex flex-row" href="/contactus">
            Contact Us <TbExternalLink className="my-icon11" />
          </a>
          <a className="links flex flex-row" href="/aboutus">
            About Us <TbExternalLink className="my-icon11" />
          </a>
          <p id='copyright'>&#169;JED 2024</p>
        </div>
      )}

      <div className='nav-links'>
        <a className="links flex flex-row" href="/">
          Home <TbExternalLink className="my-icon11" />
        </a>
        <a className="links flex flex-row" href="https://charts.xhed.net/">
          Charts <TbExternalLink className="my-icon11" />
        </a>
        <a className="links flex flex-row" href="/producttour">
          Product tour <TbExternalLink className="my-icon11" />
        </a>
        <a className="links flex flex-row" href="/contactus">
          Contact us <TbExternalLink className="my-icon11" />
        </a>
        <a className="links flex flex-row" href="/aboutus">
          About <TbExternalLink className="my-icon11" />
        </a>
      </div>

      <div className="flex flex-row items-center justify-center btn-on-header">
        {email && (
          <div>
            <FaUserCircle className="face-icon" />
          </div>
        )}
        <div className="flex flex-col">
          {email ? (
            <div>
              <h1 className='fulname'>{userName}</h1>
              <p className='text-sm emailinheader2 opacity-90 m-0 p-0'>{email}</p>
            </div>
          ) : (
            <button
              className="btn-start-trading"
              onClick={() => {
                window.location.href = "/?autoLogin=true";
              }}
            >
              Start Trading with Us
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
