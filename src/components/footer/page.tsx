import '../../app/globals.css';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter an email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://api.xhed.net/subscribe/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setIsSubscribed(true);
        setEmail('');
        setTimeout(() => setIsSubscribed(false), 3000); // Hide success message after 3 seconds
      } else {
        const data = await response.json();
        setError(data.message || 'Subscription failed. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-darkBlue text-white py-12 px-4">
      <div className="grid md:grid-cols-4 gap-8 max-w-screen-xl mx-auto">
        {/* Contact Information */}
        <div>
          <h4 className="font-semibold">Contact information</h4>
          <ul className="text-gray-400 mt-2 space-y-1">
            <li>University Of Malawi</li>
            <li>P.O Box 280</li>
            <li>Zomba</li>
            <li>Malawi</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold">Quick Links</h4>
          <ul className="text-gray-400 mt-2 space-y-1">
            <li><a href="/aboutus" className="hover:text-white">About</a></li>
            <li><a href="/charts" className="hover:text-white">Charts</a></li>
            <li><a href="/contactus" className="hover:text-white">Contact us</a></li>
            <li><a href="/login" className="hover:text-white">Start trading with us</a></li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="font-semibold">Our Services</h4>
          <ul className="text-gray-400 mt-2 space-y-1">
            <li>Automated Trading </li>
            <li>AI Market Analysis</li>
            <li>Risk Management</li>
            <li>Secure Execution</li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="md:pl-4">
          <h4 className="font-semibold">Get Latest Update</h4>
          <p className="text-gray-400 mt-2">Get real-time updates on your trades and market trends.</p>
          <form onSubmit={handleSubscribe} className="mt-4">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className="p-2 w-full border-none text-black rounded-l-md text-sm"
                disabled={isLoading}
              />
              <button 
                type="submit"
                className="bg-sky-500 px-4 py-2 rounded-r-md hover:bg-sky-600 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Subscribing...' : 'Subscribe'}
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
            {isSubscribed && <p className="text-green-400 text-sm mt-1">Subscription successful! Thank you.</p>}
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;