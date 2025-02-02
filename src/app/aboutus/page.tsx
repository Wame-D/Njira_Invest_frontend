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
    const faqData = [
        { question: "What is algorithmic trading?", answer: "Algorithmic trading involves using computer algorithms to automatically execute trades based on predefined criteria." },
        { question: "How does your platform work?", answer: "Our platform connects to various forex markets and uses advanced algorithms to analyze market data, identify trading opportunities, and execute trades on your behalf." },
        { question: "Do I need prior trading experience to use your platform?", answer: "No, prior trading experience is not required. Our platform is designed for both beginners and experienced traders." },
        { question: "Which brokers can I connect with your platform?", answer: "We support a range of trusted brokers. You can choose your preferred broker from our list and connect your account securely through our platform." },
        { question: "How do I get started with trading?", answer: "Simply create an account, choose a broker, connect your trading account, and set up your trading preferences." },
        { question: "Can I customize the trading strategies?", answer: "Yes, you can customize your trading preferences, including risk levels and strategy types." },
        { question: "Is my money safe on this platform?", answer: "Yes, your funds remain with your broker, not on our platform. We prioritize security and partner with brokers that offer secure account management." },
        { question: "Can I stop the automated trading at any time?", answer: "Yes, you can pause or stop automated trading at any time through your account dashboard." }
    ];

    return (
        <>
            <Header />
            <div className="about-container">
                <header className="about-header">About Us</header>
                <div className="about-content">
                    <p>Welcome to FX Trading! Our goal is to revolutionize the Forex trading experience through cutting-edge technology and user-friendly tools.</p>

                    {/* Our Mission */}
                    <div className="about-section">
                        <h3>Our Mission</h3>
                        <p>Our mission is to simplify forex trading for everyone by providing intelligent trading solutions that reduce risks and maximize profits.</p>
                    </div>

                    {/* Why Choose Us */}
                    <div className="about-section">
                        <h3>Why Choose Us?</h3>
                        <ul>
                            <li>✔ AI-driven trading algorithms</li>
                            <li>✔ Real-time market analysis</li>
                            <li>✔ Secure and reliable transactions</li>
                            <li>✔ User-friendly interface</li>
                            <li>✔ 24/7 customer support</li>
                        </ul>
                    </div>

                    {/* How It Works */}
                    <div className="about-section">
                        <h3>How It Works</h3>
                        <p>
                            1. **Sign Up** – Create an account in minutes. <br />
                            2. **Connect a Broker** – Link your preferred broker securely. <br />
                            3. **Set Your Strategy** – Choose between automated or manual trading. <br />
                            4. **Start Trading** – Watch the bot execute trades in real-time.
                        </p>
                    </div>
                </div>
            </div>

            {/* FAQ Section as Footer */}
            <div className="faqpage">
                <h2>FAQ (Frequently Asked Questions)</h2>
                <p className="text-m text-black opacity-65 mt-2 mb-12">Find answers to common questions about our platform.</p>
                {faqData.map((faq, index) => (
                    <FAQItem key={index} question={faq.question} answer={faq.answer} />
                ))}
            </div>
        </>
    );
}
