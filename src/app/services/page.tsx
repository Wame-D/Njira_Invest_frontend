import React from 'react';
import { AiOutlineLineChart } from 'react-icons/ai';  // Profit and Loss Tracking
import { MdSecurity } from 'react-icons/md';  // Risk Management Tools
import { FaChartLine } from 'react-icons/fa';  // Real-time Analytics and Reporting
import { AiOutlineRobot } from 'react-icons/ai';  // Automated Trading

export default function Services() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 mb-20 w-full">
            <h2 className="text-3xl font-bold mb-10">
    Fx<span className="text-sky-500">Auto</span> Key Features
</h2>
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl w-full">
                {/* Automated Trading */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <AiOutlineRobot size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Automated Trading</h2>
                    <p className="mt-4 text-gray-600">
                        Our trading app is fully automated, designed to place trades on your behalf based on deep market analysis. The algorithm handles everything from data analysis to execution.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Trade &gt;
                    </a>
                </div>

                {/* Real-time Analytics and Reporting */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <FaChartLine size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Real-time Analytics and Reporting</h2>
                    <p className="mt-4 text-gray-600">
                        Get access to real-time market insights, analytics, and trade execution reports. See how the algorithm is performing and the reasons behind every trade.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        View Analytics and Reporting &gt;
                    </a>
                </div>

                {/* Risk Management Tools */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <MdSecurity size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Risk Management Tools</h2>
                    <p className="mt-4 text-gray-600">
                        We prioritize capital protection with robust risk management systems. Customize your risk levels to match your trading strategy. Built-in stop loss and take profit functionality and etc.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Get Started &gt;
                    </a>
                </div>

                {/* Risk Management Tools */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <MdSecurity size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Risk Management Tools</h2>
                    <p className="mt-4 text-gray-600">
                        We prioritize capital protection with robust risk management systems. Customize your risk levels to match your trading strategy. Built-in stop loss and take profit functionality and etc.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Get Started &gt;
                    </a>
                </div>

                {/* Risk Management Tools */}
                <div className="flex flex-col p-6 m-4 bg-white rounded-lg shadow-md w-80">
                    <MdSecurity size={50} className="text-sky-500" />
                    <h2 className="mt-4 text-xl font-semibold">Risk Management Tools</h2>
                    <p className="mt-4 text-gray-600">
                        We prioritize capital protection with robust risk management systems. Customize your risk levels to match your trading strategy. Built-in stop loss and take profit functionality and etc.
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
                        Our platform provides detailed insights into your trading performance, helping you understand trends, optimize strategies, and stay on top of your financial goals.
                    </p>
                    <a href="/" className="flex items-center mt-4 text-sky-500 hover:text-sky-700">
                        Track &gt;
                    </a>
                </div>
            </div>
        </div>
    );
}