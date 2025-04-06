'use client';
import Header from "./header/page";
import TopSection from "./topSection/page";
import Services from "./services/page";
import HowItWork from "./how/page";
import React, { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';  
import { MdChat } from 'react-icons/md'; 
import Link from 'next/link';
import AiPage from "./chatot/page";
import Footer from "./footer/page";
import BeginTrading from "./begintrading/page";

export default function Home() {

  const [showChatbot, setShowChatbot] = useState(false);

  const openChatbot = () => {
    setShowChatbot(true);
  };

  const closeChatbot = () => {
    setShowChatbot(false);
  };
  return (
    <>
      <div className=" items-center justify-items-center h-fit w-full ">
        <Header />
        <TopSection />
        <Services />
        <div id="how-it-work">
          <BeginTrading/>
          <HowItWork />
        </div>
        <div className=' flex justify-center items-center fixedwhatsappdiv'>
            <p className='fixedwhatsapp'>
              <Link href="https://wa.me/265990024684">
                
                <FaWhatsapp color="#25D366" className="my-ico"/>
              </Link>
            </p>
          </div>
          <div className="flex justify-center items-center  flex-col fixed-buttondiv" >
            <button className="flex justify-center items-center fixed-button" onClick={openChatbot}>
              <p >
                 <MdChat className="my-ico" />
              </p>
            </button>
            <p className='text-sm text-white opacity-100 mt-1'>Ask AI</p>
          </div>


          {/* Conditional rendering for the chatbot overlay */}
          {showChatbot && (
            <div className="overlay1">
              <div className="modal1">
                <span className="close1" onClick={closeChatbot}>&times;</span>
                <AiPage />
              </div>
            </div>
          )}
      </div>

      <Footer/>
    </>
  );
}
