import React from 'react';
import '../../app/globals.css';


export default function BeginTrading() {
    return (
        <div className="flex flex-col items-center justify-center  w-full">
            {/* Other sections remain unchanged */}
            
            {/* Get Started Section with Background Image */}
            <div 
                className="my-16 w-full py-20 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
                // style={{ backgroundImage: "url('https://cdn.bcs-express.ru/article-head/6924.jpg')" }}
            >
                <h2 className="text-4xl font-bold text-gray-600 mb-4">
                    Get <span className="text-sky-400">started</span> today with Fx<span className="text-sky-400">Auto</span>
                </h2>
                <p className="text-m text-gray-600 mb-6">
                    Open account and start trading instruments!
                </p>
                <button className="px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition text-lg font-semibold">
                    Start Trading with Us
                </button>
            </div>
        </div>
    );
}