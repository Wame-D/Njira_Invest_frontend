'use client';
import './top.css';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Login from '../login/page';

export default function TopSection() {
    const [showChatbot, setShowChatbot] = useState(false);

    const openChatbot = () => {
        setShowChatbot(true);
    };

    const closeChatbot = () => {
        setShowChatbot(false);
    };
    return (
        <>
            <div className=" items-center flex flex-col  justify-items-center w-full  topsection">
                <div className='w-full items-center flex flex-row  justify-items-center inner-div '>
                    <div className='h-fit flex   justify-items-center flex-col text-div'>
                        <h1> <strong>Welcome to  </strong> the Admin Panel</h1>
                        <p className='text-m text-white opacity-80'>Here you can manage users, resources, and content with ease. Use the tools provided to ensure the platform remains a supportive and safe space for all.</p>

                        <div className='w-fit h-fit flex flex-row mt-8  inside-utton  '>
                            <div className="links-in-top flex flex row  justify-items-center items-center "  onClick={openChatbot}>
                                Get Started  <FontAwesomeIcon icon={faAngleRight} className="ml-2" />
                            </div>

                        </div>

                    </div>
                    {/* Conditional rendering for the chatbot overlay */}
                    {showChatbot && (
                        <div className="overlay">
                            <div className="modal">
                                <span className="close" onClick={closeChatbot}>&times;</span>
                                <Login />
                            </div>
                        </div>
                    )}
                </div>


            </div>
        </>
    );
}
