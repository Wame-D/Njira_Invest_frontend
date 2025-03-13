import "./services.css";
import React from 'react';

import { AiOutlineLineChart } from 'react-icons/ai';  // Profit and Loss Tracking
import { MdSecurity } from 'react-icons/md';  // Risk Management Tools
import { FaChartLine } from 'react-icons/fa';  // Real-time Analytics and Reporting
import { AiOutlineRobot } from 'react-icons/ai';


export default function Services() {
    return (
        <>
            <div className=" items-center flex flex-col justify-center pt-20 h-fit mb-20 w-full  servicesdive">
                <h2 className="what-we-offer">AutoFx Key Features</h2>
                <div className="items-center flex justify-center servicesdive1">
                    <div className="flex flex-col p-4 m-4 servicescards">
                        <h1> <AiOutlineRobot size={50} /></h1>
                        <h2 className="mt-4 text-bd text-xl">Automated Trading</h2>
                        <p className='text-m text-black opacity-65 mt-4'>Our trading app is fully automated, designed to place trades on your behalf based on deep market analysis. The algorithm handles everything from data analysis to execution.</p>
                        <a className=" flex flex row  justify-items-center items-center " href="/">
                            Trade &gt;

                        </a>
                    </div>

                    <div className="flex flex-col p-4 m-4 servicescards">
                        <h1><FaChartLine size={50} /></h1>
                        <h2 className="mt-4 text-bd text-xl">Real-time Analytics and Reporting</h2>
                        <p className='text-m text-black opacity-65 mt-4'>Get access to real-time market insights, analytics, and trade execution reports. See how the algorithm is performing and the reasons behind every trade.</p>
                        <a className=" flex flex row  justify-items-center items-center " href="/">
                            View Analytics and Reporting  &gt;

                        </a>
                    </div>

                    <div className="flex flex-col p-4 m-4 servicescards">
                        <h1><MdSecurity size={50} /></h1>
                        <h2 className="mt-4 text-bd text-xl">Risk Management Tools</h2>
                        <p className='text-m text-black opacity-65 mt-4'>We prioritize capital protection with robust risk management systems. Customize your risk levels to match your trading strategy. Built-in stop loss and take profit functionality and etc</p>
                        <a className=" flex flex row  justify-items-center items-center " href="/">
                            Get Started &gt;

                        </a>
                    </div>

                    <div className="flex flex-col p-4 m-4 servicescards">
                        <h1>  <AiOutlineLineChart size={50} /></h1>
                        <h2 className="mt-4 text-bd text-xl">Profit and Loss Tracking</h2>
                        <p className='text-m text-black opacity-65 mt-4'>Our platform provides detailed insights into your trading performance, helping you understand trends, optimize strategies, and stay on top of your financial goals.</p>
                        <a className=" flex flex row  justify-items-center items-center " href="/">
                            Track &gt;

                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}