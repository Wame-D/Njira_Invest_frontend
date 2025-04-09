import React, { useState } from 'react';
import '../../app/globals.css';
import { getCookie } from 'cookies-next';
import Login from '../login/page';


export default function BeginTrading() {
    const [showChatbot, setShowChatbot] = useState(false);
    const closeChatbot = () => {
        setShowChatbot(false);
    };
    const handleDashboardClick = () => {
        if (token) {
            window.location.href = '/dashboard';
            // going to dashboard
        } else {
            setShowChatbot(true);
        }
    };
    const token = getCookie('userToken');
    const openLogin = () => {
        if (token) {
            window.location.href = '/dashboard';
            // going to dashboad
        } else {
            setShowChatbot(true);
        }
    };
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
                <p className="text-m text-gray-600">
                    Open account and start trading instruments!
                </p>

                <div className='w-fit h-fit flex top-links dir-alternate dir-reverse'>
                    {token ? (

                        <a className="links-in-top flex flex row justify-items-center items-center inside-utton" onClick={handleDashboardClick}>
                            Your dashboard &gt;
                        </a>
                    ) : (
                        <button className="links-in-top flex flex row justify-items-center items-center inside-utton" onClick={openLogin}>
                            Start trading with us &gt;
                        </button>
                    )}


                </div>
            </div>
            {/* Conditional rendering for the chatbot overlay */}
            {showChatbot && (
                <div className="overlay w-full h-full">
                    <div className="modal w-full h-full">
                        <div className="close" onClick={closeChatbot}>&times;</div>
                        <Login />
                    </div>
                </div>
            )}
        </div>
    );
}