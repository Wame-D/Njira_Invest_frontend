"use client";

import { useState } from 'react';

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
            <div className="mt-6 space-y-6">
              <div className="space-y-4 pl-6 border-l-2 border-blue-500">
                <h3 className="font-medium text-lg">Automated Indices Trading</h3>
                <p className="text-gray-400">Enjoy automated trading on selected indices.</p>
                
                <div className="space-y-3 ml-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Trade major global indices including S&P 500, NASDAQ, FTSE 100, and more</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>24/5 automated trading aligned with global market hours</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Advanced risk management with automatic stop-loss and take-profit</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Real-time performance analytics and reporting dashboard</p>
                  </div>
                  <button 
                    onClick={() => toggleSection('automatedIndices')}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    {expandedSections.automatedIndices ? 'Show Less Details' : 'Show More Details'}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${expandedSections.automatedIndices ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedSections.automatedIndices && (
                    <div className="ml-6 mt-2 space-y-2 text-gray-400">
                      <p>• Algorithmic strategies optimized for index volatility patterns</p>
                      <p>• Sector rotation detection for enhanced positioning</p>
                      <p>• Correlation matrix to diversify across uncorrelated indices</p>
                      <p>• Economic calendar integration for fundamental events</p>
                      <p>• Liquidity analysis for optimal execution</p>
                      <p>• Backtesting capabilities with 10+ years historical data</p>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4 pl-6 border-l-2 border-blue-500">
                <h3 className="font-medium text-lg">Automated Currency Trading</h3>
                <p className="text-gray-400">Trade currency pairs effortlessly with our automated system now!</p>
                
                <div className="space-y-3 ml-4">
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Access to 50+ major, minor and exotic currency pairs</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>24/6 trading to capture all forex market sessions</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>AI-powered spread analysis for optimal entry points</p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p>Multi-timeframe analysis for comprehensive market view</p>
                  </div>
                  <button 
                    onClick={() => toggleSection('automatedCurrency')}
                    className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
                  >
                    {expandedSections.automatedCurrency ? 'Show Less Details' : 'Show More Details'}
                    <svg className={`w-4 h-4 ml-1 transition-transform ${expandedSections.automatedCurrency ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedSections.automatedCurrency && (
                    <div className="ml-6 mt-2 space-y-2 text-gray-400">
                      <p>• Carry trade optimization based on interest rate differentials</p>
                      <p>• News sentiment analysis for fundamental trading</p>
                      <p>• Correlation hedging between correlated pairs</p>
                      <p>• Volatility-adjusted position sizing</p>
                      <p>• Central bank policy monitoring system</p>
                      <p>• Liquidity heatmap for optimal execution times</p>
                      <p>• Weekend gap analysis and protection</p>
                      <p>• Multi-account management for strategy diversification</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* AI-Powered Market Predictions */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">AI-Powered Market Predictions</h2>
            <button
              onClick={() => toggleSection('aiPredictions')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.aiPredictions ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Leverage AI-driven market forecasts to make informed trading decisions.
          </p>
          
          {expandedSections.aiPredictions && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Neural network models trained on 10+ years of market data</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Sentiment analysis scanning 1000+ news sources in real-time</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Pattern recognition identifying 50+ chart patterns and formations</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Probability scoring for each trade recommendation</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Continuous learning system that improves with market changes</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Macroeconomic factor analysis incorporating 200+ indicators</p>
              </div>
            </div>
          )}
        </div>

        {/* 24/7 Phone Support */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">24/7 Phone Support</h2>
            <button
              onClick={() => toggleSection('phoneSupport')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.phoneSupport ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Call our customer service team anytime for immediate assistance.
          </p>
          
          {expandedSections.phoneSupport && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Dedicated support lines in 15 languages</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Average response time under 2 minutes</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Tiered support system with escalation to senior specialists</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Direct line to trading desk during market hours</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now: +1 (800) 123-4567
              </button>
            </div>
          )}
        </div>

        {/* FAQs */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">FAQs</h2>
            <button
              onClick={() => toggleSection('faqs')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.faqs ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            View FAQs for detailed instructions on specific features.
          </p>
          
          {expandedSections.faqs && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="space-y-2">
                <h3 className="font-medium">Getting Started</h3>
                <div className="ml-4 space-y-2 text-gray-400">
                  <p>• How do I create an account?</p>
                  <p>• What are the minimum deposit requirements?</p>
                  <p>• How do I connect my exchange accounts?</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Trading</h3>
                <div className="ml-4 space-y-2 text-gray-400">
                  <p>• How do I set up automated trading strategies?</p>
                  <p>• What risk management tools are available?</p>
                  <p>• How are trades executed?</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Account Management</h3>
                <div className="ml-4 space-y-2 text-gray-400">
                  <p>• How do I withdraw funds?</p>
                  <p>• What security features protect my account?</p>
                  <p>• How do I view my trading history?</p>
                </div>
              </div>
              
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                View Full FAQ Database
              </button>
            </div>
          )}
        </div>

        {/* Product Tour */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Product Tour</h2>
            <button
              onClick={() => toggleSection('productTour')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.productTour ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Stay informed with the latest updates and developments in FxAuto.
          </p>
          
          {expandedSections.productTour && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Interactive walkthrough of all platform features</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Video tutorials for key functionalities</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Monthly feature update webinars</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Case studies of successful trading strategies</p>
              </div>
              <button className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg">
                Start Interactive Tour
              </button>
            </div>
          )}
        </div>

        {/* Secure Asset Fund for Users (SAFU) */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Secure Asset Fund for Users (SAFU)</h2>
            <button
              onClick={() => toggleSection('safu')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.safu ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Our trading bot allocates 10% of platform fees to a secure asset fund, providing an additional layer of protection for user funds.
          </p>
          
          {expandedSections.safu && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Funds held in cold storage with multi-signature access</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Quarterly audits by independent third-party firms</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Coverage for extraordinary events like exchange hacks</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Transparent reporting of fund balance and allocations</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Insurance-backed custody solutions for additional protection</p>
              </div>
            </div>
          )}
        </div>

        {/* Personalized Access Control */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Personalized Access Control</h2>
            <button
              onClick={() => toggleSection('accessControl')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.accessControl ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Advanced security features allow you to restrict device and IP address access, ensuring only authorized users can control your trading bot.
          </p>
          
          {expandedSections.accessControl && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Device authorization with fingerprinting technology</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>IP whitelisting for restricted access</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Time-based access restrictions</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Multi-factor authentication options (SMS, Authenticator, Hardware Key)</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Activity monitoring with real-time alerts</p>
              </div>
            </div>
          )}
        </div>

        {/* End-to-End Encryption */}
        <div className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">End-to-End Encryption</h2>
            <button
              onClick={() => toggleSection('encryption')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {expandedSections.encryption ? 'Show Less' : 'Learn More'}
            </button>
          </div>
          <p className="mt-3 text-gray-300">
            Your transaction data is safeguarded with industry-leading encryption, ensuring complete privacy and security for all your trading activities.
          </p>
          
          {expandedSections.encryption && (
            <div className="mt-6 space-y-4 pl-6 border-l-2 border-blue-500">
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>AES-256 encryption for all data in transit and at rest</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Perfect Forward Secrecy for all connections</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Zero-knowledge architecture for API keys and credentials</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Quarterly penetration testing by security experts</p>
              </div>
              <div className="flex items-start">
                <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p>Hardware Security Module (HSM) protection for cryptographic keys</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <footer className="mt-16 text-center text-gray-400 pb-8">
        <p>© {new Date().getFullYear()} FxAuto. All rights reserved.</p>
        <div className="flex justify-center space-x-6 mt-4">
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Security</a>
          <a href="#" className="hover:text-white">Contact Us</a>
        </div>
      </footer>
    </div>
  );
}