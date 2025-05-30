'use client';

import '../../app/globals.css';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.xhed.net/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Subscription failed. Please try again.');
      }

      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-darkBlue text-white py-12 px-4">
      <div className="grid md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        {/* Contact Information */}
        <div>
          <h4 className="font-semibold">Contact information</h4>
          <ul className="text-gray-400 mt-2 space-y-1">
            <li>University Of Malawi</li>
            <li>P.O Box 280</li>
            <li>Zomba</li>
            <li>Malawi</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="text-gray-400 mt-2 space-y-1">
            <li><a href="/aboutus" className="hover:text-white transition-colors">About</a></li>
            <li><a href="/charts" className="hover:text-white transition-colors">Charts</a></li>
            <li><a href="/contactus" className="hover:text-white transition-colors">Contact us</a></li>
            <li><a href="/login" className="hover:text-white transition-colors">Start trading with us</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="font-semibold">Our Services</h4>
          <ul className="text-gray-400 mt-2 space-y-1">
            <li>Automated Trading</li>
            <li>AI Market Analysis</li>
            <li>Risk Management</li>
            <li>Secure Execution</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:pl-4">
          <h4 className="font-semibold">Get Latest Update</h4>
          <p className="text-gray-400 mt-2">Get real-time updates on your trades and market trends.</p>
          <form onSubmit={handleSubscribe} className="mt-4">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="p-2 w-full border-none text-black rounded-l-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
                aria-label="Email address for newsletter subscription"
              />
              <button 
                type="submit"
                className={`bg-sky-500 px-4 py-2 rounded-r-md hover:bg-sky-600 transition-colors ${
                  isLoading ? 'opacity-75 cursor-not-allowed' : ''
                }`}
                disabled={isLoading}
                aria-label={isLoading ? 'Subscribing...' : 'Subscribe to newsletter'}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </span>
                ) : 'Subscribe'}
              </button>
            </div>
            {error && (
              <p className="text-red-400 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </p>
            )}
            {isSubscribed && (
              <p className="text-green-400 text-sm mt-1 flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Subscription successful! Thank you.
              </p>
            )}
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;