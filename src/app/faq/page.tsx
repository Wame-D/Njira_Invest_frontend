'use client';
import { useState } from "react";
import "./faq.css";
import { RiArrowDownSFill } from "react-icons/ri";
import { FaWindowClose } from "react-icons/fa";
// Define the props interface
interface FAQItemProps {
  question: string;
  answer: string;
}

// Apply the interface to the FAQItem component
const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAnswer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-components mb-2 ">
      <div
        style={{
          cursor: 'pointer'
        }}
        onClick={toggleAnswer}
        className="pb-3"
      >
        <h3>{question} {isOpen?(<FaWindowClose className="ml-1 text-red-500 text-m opacity-100 inline" />) : (<RiArrowDownSFill  className="ml-1 text-blue opacity-70 inline" />)}</h3>
      </div>
      {isOpen && (
        <div
     className="pl-2  text-m text-black opacity-65"
        >
          {answer}
        </div>
      )}
    </div>
  );
};

export default function FAQPage() {
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
    },
    {
        question: "What are the costs associated with using the platform?",
        answer: "We offer a monthly subscription with no additional fees per trade. Please see our pricing section for details on our subscription options.",
    },
    {
        question: "Is there a demo mode available?",
        answer: "Yes, we offer a demo mode where you can test the platform’s features without risking real money. It’s an excellent way to familiarize yourself with our system.",
    },
    {
        question: "How can I monitor my trades and account performance?",
        answer: "You can view real-time updates on your trades, account balance, and overall performance from your dashboard 24/7.",
    },
    {
        question: "What if I need help with setup or have questions?",
        answer: "Our support team is available 24/7 to assist you with setup and answer any questions. You can reach us through live chat or email for quick support.",
    }
];


  return (
    <>
      <div className="items-center flex flex-col justify-items-center w-full faqpage pt-12 p-4">
        <h2 className="text-black opacity-80 text-center">FAQ (Frequently Asked Questions)</h2>
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
