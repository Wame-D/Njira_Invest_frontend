const Footer = () => {
    return (
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-6 grid md:grid-cols-4 gap-8">
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
    <li><a href="http://localhost:3000/aboutus" className="hover:text-white">About</a></li>
    <li><a href="/charts" className="hover:text-white">Charts</a></li>
    <li><a href="/trading" className="hover:text-white">Trading</a></li>
    <li><a href="/contact" className="hover:text-white">Contact us</a></li>
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
          <div>
            <h4 className="font-semibold">Get Latest Update</h4>
            <p className="text-gray-400 mt-2">Get real-time updates on your trades and market trends.</p>
            <div className="mt-4 flex">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="p-2 w-full border-none text-black rounded-l-md text-sm"
              />
              <button className="bg-sky-500 px-4 py-2 rounded-r-md">Subscribe</button>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  