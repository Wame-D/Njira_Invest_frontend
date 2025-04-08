"use client";

import { useState } from 'react';
import Header from '../../components/header/page';
import Footer from '../../components/footer/page';

export default function ProductTour() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    newFeatures: false,
    automatedIndices: false,
    automatedCurrency: false,
    aiPredictions: false,
    phoneSupport: false,
    faqs: false,
    productTour: false,
    safu: false,
    accessControl: false,
    encryption: false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="font-sans text-gray-900 py-16">
      <Header/>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <header className="relative overflow-hidden bg-cover bg-center bg-no-repeat mb-12 text-center py-16"
  style={{ 
    backgroundImage: "url('https://www.aeaweb.org/content/file?id=7175')",
  }}>
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative z-10">
    <h2 className="text-3xl font-semibold text-white">
      <span className="underline decoration-sky-500">Discover</span> FxAuto: Smarter Automated Trading
    </h2>
    <br></br>
    <p className="text-xl text-gray-200 max-w-3xl mx-auto">
      Explore how FxAuto merges automation, AI, and top-tier security to redefine your trading success.
    </p>
  </div>
</header>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* New Features Section */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">New Features</h2>
            <button
              onClick={() => toggleSection('newFeatures')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.newFeatures ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            Explore our enhanced trading platform with integrated wallets, exchanges, and essential market insights.
          </p>
          
          {expandedSections.newFeatures && (
            <div className="mt-6 space-y-6">
              <div className="space-y-4 pl-6 border-l-2 border-sky-500">
                <h3 className="font-medium text-lg text-sky-700">Automated Indices Trading</h3>
                <p className="text-gray-600">Enjoy automated trading on selected indices.</p>
                
                <div className="space-y-3 ml-4">
                  <div className="flex items-start">
                    <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Trade major global indices including S&P 500, NASDAQ, FTSE 100, and more</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">24/5 automated trading aligned with global market hours</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Advanced risk management with automatic stop-loss and take-profit</p>
                  </div>
                  <button 
                    onClick={() => toggleSection('automatedIndices')}
                    className="text-sky-600 hover:text-sky-500 text-sm flex items-center"
                  >
                    {expandedSections.automatedIndices ? 'Show Less Details' : 'Show More Details'}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${expandedSections.automatedIndices ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedSections.automatedIndices && (
                    <div className="ml-6 mt-2 space-y-2 text-gray-600">
                      <p>• Algorithmic strategies optimized for index volatility patterns</p>
                      <p>• Sector rotation detection for enhanced positioning</p>
                      <p>• Correlation matrix to diversify across uncorrelated indices</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 pl-6 border-l-2 border-sky-500">
                <h3 className="font-medium text-lg text-sky-700">Automated Currency Trading</h3>
                <p className="text-gray-600">Trade currency pairs effortlessly with our automated system now!</p>
                
                <div className="space-y-3 ml-4">
                  <div className="flex items-start">
                    <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">Access to 50+ major, minor and exotic currency pairs</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-gray-700">24/6 trading to capture all forex market sessions</p>
                  </div>
                  <button 
                    onClick={() => toggleSection('automatedCurrency')}
                    className="text-sky-600 hover:text-sky-500 text-sm flex items-center"
                  >
                    {expandedSections.automatedCurrency ? 'Show Less Details' : 'Show More Details'}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${expandedSections.automatedCurrency ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedSections.automatedCurrency && (
                    <div className="ml-6 mt-2 space-y-2 text-gray-600">
                      <p>• Carry trade optimization based on interest rate differentials</p>
                      <p>• News sentiment analysis for fundamental trading</p>
                      <p>• Correlation hedging between correlated pairs</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI-Powered Market Predictions */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">AI-Powered Market Predictions</h2>
            <button
              onClick={() => toggleSection('aiPredictions')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.aiPredictions ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            Leverage AI-driven market forecasts to make informed trading decisions.
          </p>
          
          {expandedSections.aiPredictions && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-sky-500">
              <div className="flex items-start">
                <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Neural network models trained on 10+ years of market data</p>
              </div>
              <div className="flex items-start">
                <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Sentiment analysis scanning 1000+ news sources in real-time</p>
              </div>
            </div>
          )}
        </div>

        {/* 24/7 Phone Support */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">24/7 Phone Support</h2>
            <button
              onClick={() => toggleSection('phoneSupport')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.phoneSupport ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            Call our customer service team anytime for immediate assistance.
          </p>
          
          {expandedSections.phoneSupport && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-sky-500">
              <div className="flex items-start">
                <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Dedicated support lines in 15 languages</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg flex items-center justify-center text-white">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now: +1 (800) 123-4567
              </button>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">FAQs</h2>
            <button
              onClick={() => toggleSection('faqs')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.faqs ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            View FAQs for detailed instructions on specific features.
          </p>
          
          {expandedSections.faqs && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-sky-500">
              <div className="space-y-2">
                <h3 className="font-medium text-sky-700">Getting Started</h3>
                <div className="ml-4 space-y-2 text-gray-600">
                  <p>• How do I create an account?</p>
                  <p>• What are the minimum deposit requirements?</p>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg text-white">
                View Full FAQ Database
              </button>
            </div>
          )}
        </div>

        {/* Secure Asset Fund for Users (SAFU) */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">Secure Asset Fund for Users (SAFU)</h2>
            <button
              onClick={() => toggleSection('safu')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.safu ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            Our trading bot allocates 10% of platform fees to a secure asset fund, providing an additional layer of protection for user funds.
          </p>
          
          {expandedSections.safu && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-sky-500">
              <div className="flex items-start">
                <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Funds held in cold storage with multi-signature access</p>
              </div>
            </div>
          )}
        </div>

        {/* Personalized Access Control */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">Personalized Access Control</h2>
            <button
              onClick={() => toggleSection('accessControl')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.accessControl ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            Advanced security features allow you to restrict device and IP address access, ensuring only authorized users can control your trading bot.
          </p>
          
          {expandedSections.accessControl && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-sky-500">
              <div className="flex items-start">
                <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">Device authorization with fingerprinting technology</p>
              </div>
            </div>
          )}
        </div>

        {/* End-to-End Encryption */}
        <div className="bg-sky-50 rounded-xl p-6 shadow-lg border border-sky-100">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-sky-800">End-to-End Encryption</h2>
            <button
              onClick={() => toggleSection('encryption')}
              className="px-4 py-2 bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors text-white"
            >
              {expandedSections.encryption ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-700">
            Your transaction data is safeguarded with industry-leading encryption, ensuring complete privacy and security for all your trading activities.
          </p>
          
          {expandedSections.encryption && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-sky-500">
              <div className="flex items-start">
                <div className="bg-sky-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-gray-700">AES-256 encryption for all data in transit and at rest</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <br></br>
      <br></br>
      <Footer/>
    </div>
  );
}