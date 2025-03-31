import React from 'react';
import { 
  AiOutlineLineChart, 
  AiOutlineRobot, 
  AiOutlineBulb,
  AiOutlineRight 
} from 'react-icons/ai';
import { 
  FiShield, 
  FiPieChart,
  FiDollarSign,
  FiHelpCircle,
  FiBookOpen,
  FiPhone,
  FiLock,
  FiUsers
} from 'react-icons/fi';

export default function BeginTrading() {
    return (
        <div className="flex flex-col items-center justify-center pt-20 mb-20 w-full">
            {/* Other sections remain unchanged */}
            
            {/* Get Started Section with Background Image */}
            <div 
                className="mt-16 w-full py-20 bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center"
                style={{ backgroundImage: "url('https://cdn.bcs-express.ru/article-head/6924.jpg')" }}
            >
                <h2 className="text-4xl font-bold text-white mb-4">
                    Get <span className="text-sky-400">started</span> today with Fx<span className="text-sky-400">Auto</span>
                </h2>
                <p className="text-xl text-gray-200 mb-6">
                    Open account and start trading instruments!
                </p>
                <button className="px-8 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-700 transition text-lg font-semibold">
                    Start Trading with Us
                </button>
            </div>
        </div>
    );
}