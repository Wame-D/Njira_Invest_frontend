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
              <li>About</li>
              <li>Charts</li>
              <li>Trading</li>
              <li>Contact us</li>
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
    );
  };
  
  export default Footer;
  