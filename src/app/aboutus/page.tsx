import Header from "../header/page";
import { FaCheckCircle, FaChartLine, FaUsers } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function About(){
  const members = [
    { name: "Peter Kayira", position: "Front-End Developer", image: "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/460370590_17985617756721539_7305534897771603808_n.jpg?stp=dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFT5EXillj2O0PYInLqt3wFY4MeacJirB1jgx5pwmKsHTOeRcnv4rNJdkNsfxf0Lk9Fpo0OywwkOin36FBAUHeY&_nc_ohc=Z7Lz0BS4mlcQ7kNvgGvvlvO&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&_nc_gid=AKo1IPzutvFn6RYLbDXQgJK&oh=00_AYBqhzigo96tCFY48UmHixDFk3qZYHC5TRPsRYFLsJZOrA&oe=67B9F09B" },
    { name: "Richard Mlambuzi", position: "Trading Strategist", image: "https://avatars.githubusercontent.com/u/95221011?v=4" },
    { name: "Daniel Wame", position: "Market Analyst", image: "https://avatars.githubusercontent.com/u/119085857?v=4" },
    { name: "Melvin Kalidozo", position: "Trade Execution Specialist", image: "https://scontent.fblz2-1.fna.fbcdn.net/v/t39.30808-6/462695211_2592965444207395_5286495986513675172_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGjFMce3hsLDMNFeCpNI7l3LmthFglfzY0ua2EWCV_NjZseAGNSeVU3RqVq7rbAcqf-qmBtFEgkfb8UUXbeb3PO&_nc_ohc=w9ixIDtdlyMQ7kNvgFsO4tn&_nc_zt=23&_nc_ht=scontent.fblz2-1.fna&_nc_gid=A9aamcndbYpz_XpxMtP2-en&oh=00_AYA_h9g_0rzjkf5FiMf7O-1Pd5qUVv6aGiWPCgsAL1qSMg&oe=67B9E18A" },
  ];
  return(
    <div>
      <Header/>
      <div className="relative flex items-center justify-center h-[30vh] bg-stone-600 text-white text-2xl font-bold mt-14 overflow-hidden">
  <img 
    src="https://www.seputarforex.com/sf2016materi/post/2015-06/long-term-4h-dengan-persilangan-ema-8-dan-ema-20-236801-1.jpg" 
    alt="About us background" 
    className="absolute inset-0 w-full h-full object-cover"
  />
  <h1 className="relative z-10">About Us</h1>
</div>


      <div className="grid grid-cols-3 h-[20%] bg-white h-[30vh] mr-2 items-center mt-10">
        <div  className="bg-white p-3 m-3">
          <h1 className="font-bold text-4xl">
            <span className="text-sky-500">Revolutionizing </span>
            Forex Trading with AI-Powered Bots!</h1>
        </div>
        <div  className="bg-white p-3 m-3 w-[26vw]">
          <h1>At Auto-FX, we use AI-powered automation to make Forex trading smarter and faster. Our bot analyzes real-time market trends and executes trades with precision, keeping you ahead 24/7.</h1>
        </div>
        <div className="bg-white p-3 m-3 w-[26vw]">
          <h1>Built with advanced algorithms, it adapts to market changes and makes data-driven decisions. Whether you aim to maximize profits, manage risk, or automate trading, our bot has you covered.</h1>
        </div>
      </div>
    
      <div className="grid grid-cols-3 pl-12 mt-20 mb-20">
      <div className="flex items-center gap-4 p-4 bg-white shadow-2xl rounded-lg w-[25vw] h-[20vh]">
          <div className="text-sky-500 text-3xl">{<FaCheckCircle />}</div>
          <div>
            <h3 className="font-bold">Automated Trading 24/7</h3>
            <p className="text-gray-600 text-sm">Trades automatically, ensuring you never miss an opportunity.

</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white shadow-2xl rounded-lg w-[25vw] h-[20vh]">
          <div className="text-sky-500 text-3xl">{<FaChartLine/>}</div>
          <div>
            <h3 className="font-bold">Smart Market Insights</h3>
            <p className="text-gray-600 text-sm">Analyzes trends and key indicators for informed decisions.</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white shadow-2xl rounded-lg w-[25vw] h-[20vh] ">
          <div className="text-sky-500 text-3xl">{<FaUsers />}</div>
          <div>
            <h3 className="font-bold">Professional Team</h3>
            <p className="text-gray-600 text-sm">Experts continuously refine algorithms for reliability.</p>
          </div>
        </div>

      </div>

      <div className="flex flex-row ml-[10vw]">
  {/* Image Section */}
  <div className="w-[40vw] h-[50vh] bg-black m-8 rounded-lg overflow-hidden">
    <img 
      src="/path-to-your-image.jpg" 
      alt="Forex Trading Bot" 
      className="w-full h-full object-cover rounded-lg"
    />
  </div>

  {/* Video Section */}
  <div className="w-[40vw] h-[40vh] bg-stone-600 rounded-lg mt-[10vh] ml-[-20vh] overflow-hidden">
    <video 
      src="/path-to-your-video.mp4" 
      controls 
      className="w-full h-full object-cover rounded-lg"
    />
  </div>
</div>


      <div className="bg-stone-100 h-[120vh] w-[100vw] mt-10 pb-10">
        <h1 className=" font-bold text-2xl text-center pt-20">
          <span className="text-sky-500 font-bold text-2xl"> Team </span>
          Members
        </h1>
        <p className="mt-10 mb-10 text-center">Meet the experts behind our AI-powered trading bot, dedicated to innovation and success in Forex trading.</p>
        <div className="flex justify-center gap-6 p-10 bg-gray-100">
          {members.map((member, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 text-center">
          <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">{member.name}</h3>
            {/* <p className="text-sm text-gray-500">{member.position}</p> */}
          </div>
          <div className="bg-sky-500 text-white p-3 rounded-b-2xl">
            {member.position}
          </div>
          <div className="flex justify-center gap-7 p-3 text-gray-500">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
          </div>
        </div>
        ))}
        </div>
        
      </div>
      
      <div className="h-[60vh] w-[100%] bg-stone-800 grid grid-cols-4 flex pl-20 gap-4">
        
        <div className=" justify-center ">
          <p className="flex justify-center gap-7 p-3 text-sky-300">AUTO-FX</p>
          <p className="flex text-center p-3 text-gray-300">Trade forex with automated precision</p>
          <div className="flex justify-center gap-7 p-3 text-gray-500">
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="hover:text-blue-400 cursor-pointer" />
            <FaLinkedinIn className="hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="hover:text-pink-600 cursor-pointer" />
          </div>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold  p-3"> Useful links</h1>
          <h1 className="pt-3 hover:text-gray-500">About us</h1>
          <h1 className="pt-3 hover:text-gray-500">Charts</h1>
          <h1 className="pt-3 hover:text-gray-500">Trading</h1>
          <h1 className="pt-3 hover:text-gray-500">How it works</h1>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold p-3"> Support</h1>
          <h1 className="pt-3 hover:text-gray-500">Help Center</h1>
          <h1 className="pt-3 hover:text-gray-500">Contact Us</h1>
          <h1 className="pt-3 hover:text-gray-500">Terms & Conditions
</h1>
          <h1 className="pt-3 hover:text-gray-500">Resources</h1>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold t p-3"> Contact Information</h1>
          <h1 className="pt-3 hover:text-gray-500">Feel free to contact and reach us!</h1>
          <h1 className="pt-3 hover:text-gray-500">University of Malawi</h1>
          <h1 className="pt-3 hover:text-gray-500">P.O.Box 280, Zomba</h1>
          <h1 className="pt-3 hover:text-gray-500">info@autofx.com</h1>
        </div>
      </div>
    
    </div>
  );
}