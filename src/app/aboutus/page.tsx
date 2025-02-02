'use client';
import React, { useState } from 'react';
import Header from '../header/page'; // Adjust the path if necessary
import './aboutus.css';
import { RiArrowDownSFill } from "react-icons/ri";
import { FaWindowClose } from "react-icons/fa";

interface FAQItemProps {
    question: string;
    answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAnswer = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="faq-components mb-2">
            <div style={{ cursor: 'pointer' }} onClick={toggleAnswer} className="pb-3">
                <h3>
                    {question} {isOpen ? (
                        <FaWindowClose className="ml-1 text-red-500 text-m opacity-100 inline" />
                    ) : (
                        <RiArrowDownSFill className="ml-1 text-blue opacity-70 inline" />
                    )}
                </h3>
            </div>
            {isOpen && <div className="faq-answer">{answer}</div>}
        </div>
    );
};

export default function Page() {
    const faqData: { question: string; answer: string }[] = [
        {
            question: "What is algorithmic trading?",
            answer: "Algorithmic trading involves using computer algorithms to automatically execute trades based on predefined criteria. This method allows for faster and more efficient trading without the need for manual intervention.",
        },
        {
            question: "How does your platform work?",
            answer: "Our platform connects to various forex markets and uses advanced algorithms to analyze market data, identify trading opportunities, and execute trades on your behalf. Users can monitor their accounts and track performance in real time.",
        }
    ];

    return (
        <>
            <Header />
            <div className="about-container">
                <header className="about-header">
                    About Us
                </header>
                <div className="about-content">
                    <p>
                        Welcome to FX Trading! Our goal is to revolutionize the Forex trading experience through cutting-edge technology and user-friendly tools.
                        Our platform empowers traders by providing reliable data, real-time analytics, and automated trading features.
                    </p>

                    {/* Our Mission */}
                    <div className="about-section">
                        <h3>Our Mission</h3>
                        <p>
                            Our mission is to simplify forex trading for everyone by providing intelligent trading solutions that reduce risks and maximize profits.
                        </p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="about-section">
                        <h3>Why Choose Us?</h3>
                        <ul>
                            <li>✔ Machine learning trading algorithms</li>
                            <li>✔ Real-time market analysis</li>
                            <li>✔ Secure and reliable transactions</li>
                            <li>✔ User-friendly interface</li>
                            <li>✔ 24/7 customer support</li>
                        </ul>
                    </div>

                    {/* How It Works */}
                    <div className="about-section">
                    </div>
                </div>
            </div>

            {/* FAQ Section as Footer */}
            <div className="faqpage">
                <h2>FAQ (Frequently Asked Questions)</h2>
                <p className="text-m text-black opacity-65 mt-2 mb-12">
                    Find answers to the most common questions about our platform, features, and services.
                </p>
                {faqData.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </>
    );
}
