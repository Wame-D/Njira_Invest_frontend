'use client';
import './top.css';
import React, { useState } from 'react';
import Login from '../login/page';
import anime from 'animejs';
import { useEffect } from 'react'

export default function TopSection() {
    const [showChatbot, setShowChatbot] = useState(false);
    
    useEffect(() => {
        // Anime.js for dir-normal element with opacity change
        anime({
            targets: '.dir-normal',
            translateX: 500,
            opacity: [1,0.3], 
            direction: 'alternate',
            easing: 'easeInOutSine',
        });
    
        // Anime.js for dir-reverse element with opacity change
        anime({
            targets: '.dir-reverse',
            translateX: -250,
            opacity: [1, 0.3], 
            direction: 'alternate',
            easing: 'easeInOutSine',
        });
    
        // Anime.js for dir-alternate element with opacity change
        anime({
            targets: '.dir-alternate',
            translateX: 250,
            opacity: [1,0.3], 
            direction: 'alternate',
            easing: 'easeInOutSine',
        });
    }, []); 
    
    const openLogin = () => {
        setShowChatbot(true);
    };

    const closeChatbot = () => {
        setShowChatbot(false);
    };
    return (
        <>
            <div className=" items-center flex flex-col  justify-center w-full  topsection">
                <div className='w-full items-center flex flex-col  justify-center inner-div '>
                    <div className='h-fit flex  items-center justify-center flex-col text-div'>
                        <h1 className='text-center dir-normal'>TRADE FOREX WITH <strong className='automated'>AUTOMATED</strong> PRECISION</h1>
                        <p className='text-m text-white opacity-80 text-center dir-reverse'>Harness the power of algorithmic trading. Let our system trade for you while you watch your portfolio grow, 24/7.</p>

                        <div className='w-fit h-fit flex  mt-20  top-links  dir-alternate'>
                            <button className="links-in-top flex flex row  justify-items-center items-center inside-utton " onClick={openLogin}>
                                Start Trading  &gt;
                            </button>

                            <a className="links-in-top flex flex row  justify-items-center items-center inside-utton2 " href='/#how-it-work'>
                                How it Works  &gt;
                            </a>
                        </div>

                    </div>

                </div>

                {/* Conditional rendering for the chatbot overlay */}
                {showChatbot && (
                    <div className="overlay w-full h-full ">
                        <div className="modal w-full h-full">
                            <div className="close" onClick={closeChatbot}>&times;</div>
                            <Login />
                        </div>
                    </div>
                )}

            </div>

        </>
    );
}
