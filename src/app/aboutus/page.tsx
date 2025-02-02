'use client';
import React from 'react';
import Header from '../header/page'; // Adjust the path if necessary
import './aboutus.css';

export default function Page() {
    return (
        <>
            <Header />
            <div className="about-container">
                <header className="about-header">
                    About Us
                </header>
                <div className="about-content">
                    <p>
                        Welcome to FX Trading! Our goal is to revolutionize the Forex trading experience through cutting-edge technology and user-friendly tools.
                        Our platform empowers traders by providing reliable data, real-time analytics, and automated trading features.
                    </p>
                    <p>
                        Whether you are a seasoned trader or just starting, our tools are designed to support your trading journey.
                        We value transparency, innovation, and your success in the Forex market.
                    </p>
                </div>
            </div>
        </>
    );
}
