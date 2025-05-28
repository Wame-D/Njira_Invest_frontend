'use client';
import React, { useEffect } from 'react';
import Header from "../components/header/page";
import TopSection from "../components/topSection/page";
import Services from "../components/services/page";
import HowItWork from "../components/how/page";
import Footer from "../components/footer/page";
import BeginTrading from "../components/begintrading/page";

// Note: In Next.js App Router, use metadata.ts instead of Head
export default function Home() {
  // Add smooth scrolling behavior
  useEffect(() => {
    // Enable smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Handle anchor link clicks for smooth scrolling
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const id = anchor.getAttribute('href')?.substring(1);
        if (id) {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <>
      {/* JSON-LD for SEO */}
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
      
      <main className="w-full h-fit">
        <Header />
        
        <section id="top-section">
          <TopSection />
        </section>
        
        <section id="services">
          <Services />
        </section>
        
        <section id="how-it-work">
          <HowItWork />
        </section>
        
        <section id="begin-trading">
          <BeginTrading />
        </section>
        
        <Footer />
      </main>
    </>
  );
}
