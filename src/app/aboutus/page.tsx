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
        },
        {
            question: "Do I need to have prior trading experience to use your platform?",
            answer: "No, prior trading experience is not required. Our platform is designed for both beginners and experienced traders. We provide user-friendly tools and resources to help you understand the trading process.",
        },
        {
            question: "Which brokers can I connect with your platform?",
            answer: "We support a range of trusted brokers. You can choose your preferred broker from our list and connect your account securely through our platform.",
        },
        {
            question: "How do I get started with trading?",
            answer: "Simply create an account, choose a broker, connect your trading account, and set up your trading preferences. Our algorithm will then start trading based on your settings.",
        },
        {
            question: "Can I customize the trading strategies?",
            answer: "Yes, you can customize your trading preferences, including risk levels and strategy types. Our platform offers several strategy options, so you can tailor the experience to meet your trading goals.",
        },
        {
            question: "Is my money safe on this platform?",
            answer: "Yes, your funds remain with your broker, not on our platform. We prioritize security and partner with brokers that offer secure account management and comply with industry regulations.",
        },
        {
            question: "Can I stop the automated trading at any time?",
            answer: "Yes, you can pause or stop automated trading at any time through your account dashboard. Your settings will be saved for when you wish to resume.",
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
                    <p>
                        Whether you are a seasoned trader or just starting, our tools are designed to support your trading journey.
                        We value transparency, innovation, and your success in the Forex market.
                    </p>
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
