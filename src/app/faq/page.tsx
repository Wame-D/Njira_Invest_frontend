'use client';
import { useState } from "react";
import "./faq.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faClose } from '@fortawesome/free-solid-svg-icons';

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
          cursor: 'pointer',
          padding: '5px',
        }}
        onClick={toggleAnswer}
      >
        <h3>{question} {isOpen?(<FontAwesomeIcon icon={faClose} className="ml-2 text-red-500 opacity-100" />) : (<FontAwesomeIcon icon={faAngleDown} className="ml-2 text-blue opacity-70" />)}</h3>
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
      answer: "Algorithmic trading involves using computer algorithms to automatically execute trades based on predefined criteria. This method allows for faster and more efficient trading without the need for manual intervention",
    },
    {
      question: 'How does your platform work?',
      answer: 'Our platform connects to various forex markets and uses advanced algorithms to analyze market data, identify trading opportunities, and execute trades on your behalf. Users can monitor their accounts and track performance in real time.',
    },
    {
      question: 'Do I need to have prior trading experience to use your platform?',
      answer: 'No, prior trading experience is not required. Our platform is designed for both beginners and experienced traders. We provide user-friendly tools and resources to help you understand the trading process.',
    },
  ];

  return (
    <>
      <div className="items-center flex flex-col justify-items-center w-full faqpage pt-12 p-8">
        <h2 className="text-black opacity-80">FAQ (Frequently Asked Questions)</h2>
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
