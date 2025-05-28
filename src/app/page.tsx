'use client';
import Head from 'next/head';
import Header from "../components/header/page";
import TopSection from "../components/topSection/page";
import Services from "../components/services/page";
import HowItWork from "../components/how/page";
import React from 'react';
// import { FaWhatsapp } from 'react-icons/fa';
// import { MdChat } from 'react-icons/md';
// import Link from 'next/link';
// import AiPage from "../components/chatot/page";
import Footer from "../components/footer/page";
import BeginTrading from "../components/begintrading/page";

export default function Home() {

  // const [showChatbot, setShowChatbot] = useState(false);

  // const openChatbot = () => {
  //   setShowChatbot(true);
  // };

  // const closeChatbot = () => {
  //   setShowChatbot(false);
  // };
  return (
    <>
      {/* SEO Configuration */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "FX-auto-malawi",
            "url": "https://forex.xhed.net",
            "logo": "https://forex.xhed.net/_next/image?url=%2Fflyer-xhed-on-desk-no-res.png&w=640&q=75",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+265990024684",
              "contactType": "Customer Support",
              "areaServed": "Global",
              "availableLanguage": "English",
            },
            "sameAs": [
              "https://web.facebook.com/profile.php?id=61556746648275",
              "https://www.linkedin.com/in/daniel-wame-163718256",
              "https://wa.me/265990024684",
            ],
            "address": {
              "@type": "PostalAddress",
              "addressRegion": "Zomba",
              "addressCountry": "Malawi",
            },
          }),
        }}
      />
      <Head>
        <title>FX-auto-malawi</title>
        <meta
          name="description"
          content="Trade forex automatically with Xhed FX. Our AI-powered app places trades for you using deep market analysis. Trusted by traders globally."
        />
        <meta name="keywords" content="xhed fx, forex trading, automated forex trading, fx auto, forex Malawi, forex robot" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Xhed Technologies" />
        <link rel="canonical" href="https://forex.xhed.net" />
      </Head>
      <div className=" items-center justify-items-center h-fit w-full ">
        <Header />
        <TopSection />
        <Services />
        <div id="how-it-work">

          <HowItWork />
          <BeginTrading />
        </div>
      </div>

      <Footer />
    </>
  );
}
