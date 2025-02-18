import React from "react";
import Header from "../header/page";

const Contact = () => {
  return (
    <div className="font-sans text-gray-900">
      <Header/>
      <br></br>
      <br></br>
      {/* Hero Section */}
      <section className="text-center py-16">
        <h2 className="text-3xl font-semibold">
          <span className="underline decoration-sky-500">Connect</span> with Our Team
        </h2>
        <p className="mt-2 text-gray-500 max-w-lg mx-auto">
          Have questions about our Forex trading bot? Our team is here to help with setup, strategies, and support. Reach out today!
        </p>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-6 grid md:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Get in Touch with Us</h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Input your name" className="p-2 w-full border rounded-md" />
              <input type="email" placeholder="Input your email" className="p-2 w-full border rounded-md" />
            </div>
            <input type="text" placeholder="Subject" className="p-2 w-full border rounded-md" />
            <textarea placeholder="Submit your message request" className="p-2 w-full border rounded-md h-24"></textarea>
            <button className="bg-black text-white px-4 py-2 rounded-md">Send message</button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Details</h3>
          <p className="text-gray-500 mb-4">
            Reach us for inquiries about our Forex trading bot, account setup, or technical support. We're here to assist you!
          </p>
          <div className="space-y-4">
            {/* Address */}
            <div className="flex items-center space-x-3 bg-gray-200 p-3 rounded-md">
              <span className="text-xl">📍</span>
              <p className="font-semibold">Jl. Raya Kuta No. 121</p>
            </div>
            {/* Mobile */}
            <div className="flex items-center space-x-3 bg-gray-200 p-3 rounded-md">
              <span className="text-xl">📞</span>
              <p className="font-semibold">(+021) 789 345</p>
            </div>
            {/* Availability */}
            <div className="flex items-center space-x-3 bg-gray-200 p-3 rounded-md">
              <span className="text-xl">⏰</span>
              <p className="font-semibold">Daily 09 am - 05 pm</p>
            </div>
            {/* Email */}
            <div className="flex items-center space-x-3 bg-gray-200 p-3 rounded-md">
              <span className="text-xl">📧</span>
              <p className="font-semibold">admin@support.com</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="mt-4 flex space-x-4">
            <span className="text-xl">🔵</span>
            <span className="text-xl">⚫</span>
            <span className="text-xl">🔷</span>
            <span className="text-xl">💼</span>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 py-16 mt-12">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-8 items-center">
          {/* Left - FAQ */}
          <div>
          <h2 className="text-2xl font-semibold mb-4 text-center">
  Your Common Queries Answered <br />
  <span className="underline decoration-teal-500">with Additional FAQs</span>
</h2>
<p className="text-gray-500 max-w-lg mx-auto text-center">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</p>

            {/* FAQ Accordion */}
            <div className="mt-6 space-y-4">
              {["How can I benefit from your startup?", "How can I get in touch with customer support?", 
                "How do you ensure data security and privacy?", "How do I get started with your offerings?"].map((faq, index) => (
                <details key={index} className="bg-white shadow-md p-4 rounded-md cursor-pointer">
                  <summary className="font-medium">{faq}</summary>
                  <p className="mt-2 text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <div className="flex justify-center">
            <img src="https://via.placeholder.com/400" alt="Support Team" className="rounded-md shadow-md" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h4 className="font-semibold">Contact Information</h4>
            <p className="text-gray-400 mt-2">Jl. Raya Kuta No. 121, Badung - Bali, Indonesia.</p>
            <p className="text-gray-400">(+62)-822-4545-2882</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="text-gray-400 mt-2 space-y-1">
              <li>About</li>
              <li>Services</li>
              <li>Contact</li>
              <li>Team</li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-semibold">Our Services</h4>
            <ul className="text-gray-400 mt-2 space-y-1">
              <li>UI/UX Design</li>
              <li>Mobile App Dev</li>
              <li>Web Dev</li>
              <li>Cloud Services</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold">Get Latest Update</h4>
            <p className="text-gray-400 mt-2">Lorem ipsum dolor sit amet elit.</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-2 w-full border-none text-black rounded-l-md"
              />
              <button className="bg-teal-500 px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;