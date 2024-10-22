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
          padding: '10px',
          borderRadius: '5px',
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
      question: 'What is Lumina?',
      answer: 'We are a mental health platform dedicated to providing resources, support, and tools to help users improve their mental well-being.',
    },
    {
      question: 'How do I create an account?',
      answer: 'Click the "Sign Up" button on the homepage and fill in your details to create an account.',
    },
    {
      question: 'Is my personal information safe?',
      answer: 'We prioritize your privacy and use industry-standard encryption to protect your data. Please see our Privacy Policy for more details.',
    },
  ];

  return (
    <>
      <div className="items-center flex flex-col justify-items-center w-full faqpage pt-12 p-8">
        <h2 className="text-black opacity-80">FAQ (Frequently Asked Questions)</h2>
        <p className="text-m text-black opacity-65 mt-2 mb-12">
          Find answers to the most common questions about our platform, features, and services. From account management to privacy, we've got you covered.
        </p>
        {faqData.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
}
