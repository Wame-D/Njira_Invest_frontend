import React from 'react';
import { 
  AiOutlineLineChart, 
  AiOutlineRobot, 
  AiOutlineBulb 
} from 'react-icons/ai';  // Profit and Loss Tracking, Automated Trading, AI-Powered Market Predictions
import { 
  FiShield, 
  FiPieChart,
  FiDollarSign
} from 'react-icons/fi';  // Risk Management Tools, Real-time Analytics, Multi-Asset Trading

export default function Services() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 mb-20 w-full">
            {/* Image and Text Section */}
            <div className="flex items-center justify-center gap-8 mb-10 max-w-6xl w-full">
                {/* Image Slot */}
                <div className="w-1/2">
                    <img
                        src="https://news.store.rambler.ru/img/dbcbbad4e514c45bbe20f130be3f8cac?img-format=auto&img-1-resize=height:350,fit:max&img-2-filter=sharpen"
                        alt="Placeholder"
                        className="rounded-lg"
                    />
                </div>

                {/* New Features Section */}
                <div className="w-1/2">
                    <h3 className="text-2xl font-bold mb-4">
                        New <span className="text-sky-500">Features</span>
                    </h3>
                    <p className="text-gray-600">
                        Explore our enhanced trading platform with integrated wallets, exchanges, and essential market insights.
                    </p>
                    <br />
                    <div className="flex items-start">
                        {/* Left Section */}
                        <div className="w-1/2 pr-4">
                            <h4 className="text-lg font-semibold mb-2">Automated Indices Trading</h4>
                            <p className="text-gray-600">
                                Enjoy automated trading on selected indices.
                            </p>
                            <button className="mt-4 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition">
                                Learn More
                            </button>
                        </div>

                        {/* Shorter Vertical Divider */}
                        <div className="w-px bg-gray-300 h-20 mx-4"></div>

                        {/* Right Section */}
                        <div className="w-1/2 pl-4">
                            <h4 className="text-lg font-semibold mb-2">Automated Currency Trading</h4>
                            <p className="text-gray-600">
                                Trade currency pairs effortlessly with our automated system now!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold mb-10">
                Fx<span className="text-sky-500">Auto</span> Key Features
            </h2>

            {/* Key Features Grid */}
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full">
                {/* Automated Trading */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <AiOutlineRobot size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Automated Trading</h2>
                    <p className="mt-4 text-gray-600">
                        Our trading app is fully automated, designed to place trades on your behalf based on deep market analysis.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Trade &gt;
                    </a>
                </div>

                {/* Real-time Analytics and Reporting */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <FiPieChart size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Real-time Analytics and Reporting</h2>
                    <p className="mt-4 text-gray-600">
                        Get access to real-time market insights, analytics, and trade execution reports.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        View Analytics and Reporting &gt;
                    </a>
                </div>

                {/* Risk Management Tools */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <FiShield size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Risk Management Tools</h2>
                    <p className="mt-4 text-gray-600">
                        We prioritize capital protection with robust risk management systems.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Get Started &gt;
                    </a>
                </div>

                {/* Profit and Loss Tracking */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <AiOutlineLineChart size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Profit and Loss Tracking</h2>
                    <p className="mt-4 text-gray-600">
                        Our platform provides detailed insights into your trading performance.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Track &gt;
                    </a>
                </div>

                {/* Multi-Asset Trading Support */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <FiDollarSign size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Multi-Asset Trading Support</h2>
                    <p className="mt-4 text-gray-600">
                        Trade across multiple asset classes, including forex, stocks, indices, and commodities.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Explore Assets &gt;
                    </a>
                </div>

                {/* AI-Powered Market Predictions */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <AiOutlineBulb size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">AI-Powered Market Predictions</h2>
                    <p className="mt-4 text-gray-600">
                        Leverage AI-driven market forecasts to make informed trading decisions.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Learn More &gt;
                    </a>
                </div>
            </div>
        </div>
    );
}