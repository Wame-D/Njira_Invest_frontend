import React from "react";
import Header from "../../components/header/page";
import Footer from "../../components/footer/page";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="font-sans text-gray-900">
      <Header />
      <br></br>
      <br></br>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
  <img 
    src="https://www.aeaweb.org/content/file?id=7175" 
    alt="Background"
    className="absolute w-full h-full object-cover"
  />
  <div className="absolute inset-0 bg-black bg-opacity-50"></div>
  <div className="relative z-10 text-center py-16">
    <h2 className="text-3xl font-semibold text-white">
      <span className="underline decoration-sky-500">Connect</span> with Our Team
    </h2>
    <p className="mt-2 text-gray-300 max-w-lg mx-auto">
      Have questions about our Forex trading bot? Our team is here to help with setup, strategies, and support. Reach out today!
    </p>
  </div>
</section>
<br></br>
      <br></br>
      <br></br>
      {/* Contact Section */}
      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="border-4 border-sky-100 p-6 rounded-lg bg-transparent">
          <h3 className="text-lg font-semibold mb-4">Get in Touch with Us</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
            <input
  type="text"
  placeholder="Input your name"
  className="p-2 w-full border border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md"
/>
<input
  type="email"
  placeholder="Input your email"
  className="p-2 w-full border border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md"
/>
            </div>
            <input
  type="text"
  placeholder="Subject"
  className="p-2 w-full border border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md"
/>
<textarea
  placeholder="Submit your message request"
  className="p-2 w-full border border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-md h-24"
/>
            <button className="bg-darkBlue text-white px-4 py-2 rounded-md">Send message</button>
          </form>
        </div >

        {/* Contact Details Section */}
        <div id="chatnow">
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <p className="text-gray-500 mb-4">
            Reach us for inquiries about our Forex trading bot, account setup, or technical support. We&apos;re here to assist you!
          </p>
          <div className="space-y-4">
            {/* Address */}
<div className="flex items-center space-x-3 border-4 border-sky-100 p-3 rounded-md bg-transparent">
  <FaMapMarkerAlt className="text-sky-500 text-xl" />
  <p className="font-semibold">University Of Malawi</p>
</div>
            {/* Mobile */}
<div className="flex items-center space-x-3 border-4 border-sky-100 p-3 rounded-md bg-transparent">
  <FaPhone className="text-sky-500 text-xl" />
  <p className="font-semibold">(+265) 990 000 000</p>
</div>
            {/* Availability */}
<div className="flex items-center space-x-3 border-4 border-sky-100 p-3 rounded-md bg-transparent">
  <FaClock className="text-sky-500 text-xl" />  
  <p className="font-semibold">Daily 07 am - 05 pm</p>
</div>
            {/* Email */}
<div className="flex items-center space-x-3 border-4 border-sky-100 p-3 rounded-md bg-transparent">
  <FaEnvelope className="text-sky-500 text-xl" />
  <p className="font-semibold">support@autofx.com</p>
</div>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section id="faqs" className="py-16 mt-12">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center rounded-lg border-4 border-sky-100">
          {/* Left - FAQ */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Your Common Queries Answered <br />
              <span className="underline decoration-sky-500">with Additional FAQs</span>
            </h2>
            {/* FAQ Accordion */}
            <div className="mt-6 space-y-4">
              {[
                {
                  question: "What is algorithmic trading?",
                  answer: "Algorithmic trading involves using computer algorithms to automatically execute trades based on predefined criteria. This method allows for faster and more efficient trading without the need for manual intervention.",
                },
                {
                  question: "How does our platform work?",
                  answer: "Our platform connects to various forex markets and uses advanced algorithms to analyze market data, identify trading opportunities, and execute trades on your behalf. Users can monitor their accounts and track performance in real time.",
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
              ].map((faq, index) => (
                <details key={index} className="bg-white border border-sky-400 p-4 rounded-md cursor-pointer">
                  <summary className="font-medium">{faq.question}</summary>
                  <p className="mt-2 text-gray-500">{faq.answer}</p>
                </details>
              ))}
            </div>

          </div>

          {/* Right - Image */}
          <div className="flex justify-center mt-20">
            <img src="https://efsol.ru/wp-content/uploads/2024/02/girl-1.png" alt="Support Team"/>
          </div>
        </div>
      </section>
      <Footer />

    </div>
  );
};

export default Contact;