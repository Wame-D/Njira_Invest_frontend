"use client";

import { useState } from 'react';

export default function ProductTour() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    newFeatures: false,
    fxAutoFeatures: false,
    needHelp: false,
    trustedBot: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-6">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">FxAuto Product Tour</h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Discover how our advanced trading platform can enhance your trading experience with automation, AI, and top-tier security.
        </p>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* New Features Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">New Features</h2>
            <button
              onClick={() => toggleSection('newFeatures')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.newFeatures ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Explore our enhanced trading platform with integrated wallets, exchanges, and essential market insights.
          </p>
          
          {expandedSections.newFeatures && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Automated Indices Trading</h3>
                  <p className="text-gray-400">Enjoy automated trading on selected indices.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Automated Currency Trading</h3>
                  <p className="text-gray-400">Trade currency pairs effortlessly with our automated system now!</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FxAuto Key Features Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">FxAuto Key Features</h2>
            <button
              onClick={() => toggleSection('fxAutoFeatures')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.fxAutoFeatures ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          
          {expandedSections.fxAutoFeatures && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">AI-Powered Market Predictions</h3>
                  <p className="text-gray-400">Leverage AI-driven market forecasts to make informed trading decisions.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Need Help Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Need Help?</h2>
            <button
              onClick={() => toggleSection('needHelp')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.needHelp ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          
          {expandedSections.needHelp && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">24/7 Phone Support</h3>
                  <p className="text-gray-400">Call our customer service team anytime for immediate assistance.</p>
                  <button className="mt-2 px-3 py-1 bg-green-600 hover:bg-green-700 rounded-md text-sm transition-colors">
                    Call Now
                  </button>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">FAQs</h3>
                  <p className="text-gray-400">View FAQs for detailed instructions on specific features.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Product Tour</h3>
                  <p className="text-gray-400">Stay informed with the latest updates and developments in FxAuto.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Trusted Bot Section */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your trusted forex bot</h2>
            <button
              onClick={() => toggleSection('trustedBot')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.trustedBot ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Here at FxAuto, we are committed to user protection with strict protocol and industry-leading technical measures.
          </p>
          
          {expandedSections.trustedBot && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Secure Asset Fund for Users (SAFU)</h3>
                  <p className="text-gray-400">Our trading bot allocates 10% of platform fees to a secure asset fund, providing an additional layer of protection for user funds.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Personalized Access Control</h3>
                  <p className="text-gray-400">Advanced security features allow you to restrict device and IP address access, ensuring only authorized users can control your trading bot.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">End-to-End Encryption</h3>
                  <p className="text-gray-400">Your transaction data is safeguarded with industry-leading encryption, ensuring complete privacy and security for all your trading activities.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-400">
        <p>© {new Date().getFullYear()} FxAuto. All rights reserved.</p>
      </footer>
    </div>
  );
}