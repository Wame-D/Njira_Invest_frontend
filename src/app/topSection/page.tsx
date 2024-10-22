'use client';
import './top.css';
import React, { useState } from 'react';
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
                        <h1> <strong>Trade Forex</strong> with Automated Precision</h1>
                        <p className='text-m text-white opacity-80 text-center'>Harness the power of algorithmic trading. Let our system trade for you while you watch your portfolio grow, 24/7.</p>

                        <div className='w-fit h-fit flex flex-row mt-8  inside-utton  '>
                            <div className="links-in-top flex flex row  justify-items-center items-center " onClick={openChatbot}>
                                Get Started  &gt;
                            </div>

                        </div>

                    </div>

                </div>

                {/* Conditional rendering for the chatbot overlay */}
                {showChatbot && (
                    <div className="overlay">
                        <div className="modal">
                            <div className="close" onClick={closeChatbot}>&times;</div>
                            <Login />
                        </div>
                    </div>
                )}

            </div>

        </>
    );
}
