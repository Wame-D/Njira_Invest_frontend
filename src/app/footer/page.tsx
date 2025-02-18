import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <div className="h-[60vh] w-[100%] bg-stone-800 grid grid-cols-4 flex pl-20 gap-4">
        <div className="justify-center">
          <p className="flex justify-center gap-7 p-3 text-gray-300 font-bold font-sans">AUTO-FX</p>
          <p className="flex text-center p-3 text-gray-300">Trade forex with automated precision</p>
          <div className="flex justify-center gap-7 p-3 text-gray-500">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
          </div>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold p-3">Useful links</h1>
          <h1 className="pt-3 hover:text-gray-500">About us</h1>
          <h1 className="pt-3 hover:text-gray-500">Charts</h1>
          <h1 className="pt-3 hover:text-gray-500">Trading</h1>
          <h1 className="pt-3 hover:text-gray-500">How it works</h1>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold p-3">Support</h1>
          <h1 className="pt-3 hover:text-gray-500">Help Center</h1>
          <h1 className="pt-3 hover:text-gray-500">Contact Us</h1>
          <h1 className="pt-3 hover:text-gray-500">Terms & Conditions</h1>
          <h1 className="pt-3 hover:text-gray-500">Resources</h1>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold t p-3">Contact Information</h1>
          <h1 className="pt-3 hover:text-gray-500">Feel free to contact and reach us!</h1>
          <h1 className="pt-3 hover:text-gray-500">University of Malawi</h1>
          <h1 className="pt-3 hover:text-gray-500">P.O.Box 280, Zomba</h1>
          <h1 className="pt-3 hover:text-gray-500">info@autofx.com</h1>
        </div>
      </div>

      {/* Footer Copyright */}
      <div className="w-full bg-gray-800 text-gray-300 text-center py-3">
        <p>&copy; FXAUTO {currentYear}</p>
      </div>
    </div>
  );
};

export default Footer;
