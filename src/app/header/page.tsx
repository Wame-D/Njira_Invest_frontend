'use client';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import './header.css';
import { getCookie } from 'cookies-next';
import { FaUserCircle } from "react-icons/fa";

interface AuthorizeResponse {
  authorize: {
    authorize: {
      account_list: {
        account_type: string;
        loginid: string;
        currency: string;
        is_virtual: number;
        trading: Record<string, unknown>;
        account_category: string;
      }[];
      balance: number;
      email: string;
      currency: string;
      fullname: string;
      loginid: string;
      scopes: string[];
      country: string;
      local_currencies: { [key: string]: unknown };
      user_id: number;
      landing_company_fullname: string;
      account_category: string;
    };
  };
}

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

  // authorizing user
  const [authorizeData, setAuthorizeData] = useState<AuthorizeResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const domain = "https://api.xhed.net";

  const cookietoken = getCookie('userToken');

  useEffect(() => {
    if (cookietoken) {
      if (typeof cookietoken === 'string') {
        console.log(cookietoken)
        authorizeUser(cookietoken);
      }
    }
  }, [cookietoken]);

  const authorizeUser = async (token: string) => {
    console.log("Sending token:", token);

    try {
      const response = await fetch(`${domain}/authorize/`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Authorization failed:', errorData);
        throw new Error(`Authorization failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log('Authorization successful:', data);

      setAuthorizeData(data);
    } catch (error) {
      setError('Error during authorization');
      console.error('Authorization error:', error);
      // alert(error);
    }
  };

  return (
    <div className='header'>
      <h1 className='logo'>FOREX <strong className='trading'>TRADING</strong></h1>
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
          <a className="links" href="https://charts.xhed.net/">
            <FontAwesomeIcon icon={faAngleRight} className="my-icon11" />Charts
          </a>
          <p id='copyright'>&#169;JED 2024</p>
        </div>
      )}
      <div className='nav-links'>
        <a className="links" href="../">HOME  &gt;</a>
        <a className="links" href="/aboutus">ABOUT &gt;</a>
        <a className="links" href="https://charts.xhed.net/">CHARTS &gt;</a>
        <a className="links" href="/aboutus">TRADING &gt;</a>
        <a className="links" href="/aboutus">CONTACT US &gt;</a>
      </div>

      <div className="flex flex-row items-center justify-center btn-on-header">
        {authorizeData && (
          <div>
            <FaUserCircle className="face-icon" />
          </div>
        )}
        <div className="flex flex-col mr-8">
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {authorizeData ? (
            // Show user info if authorized
            <div>
              <h1 className="fullname">{authorizeData.authorize.authorize.fullname}</h1>
              <p className="text-sm emailinheader2 opacity-90 m-0 p-0">
                {authorizeData.authorize.authorize.email}
              </p>
            </div>
          ) : (
            // Show "Start Trading with Us" button if not authorized
            <button
              className="btn-start-trading"
              onClick={() => {
                // Redirect to forex.xhed.net and simulate login button click
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
