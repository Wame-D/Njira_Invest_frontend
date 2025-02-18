import Header from "../header/page";
import { FaCheckCircle, FaChartLine, FaUsers } from "react-icons/fa";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function About(){
  const members = [
    { name: "Sonny Maddison", position: "CEO, Director", image: "/placeholder.jpg" },
    { name: "Hary Warth", position: "Head Manager", image: "/placeholder.jpg" },
    { name: "Henny Habb", position: "Branch Manager", image: "/placeholder.jpg" },
    { name: "Johny Smith", position: "Supervisor", image: "/placeholder.jpg" },
  ];
  return(
    <div>
      <Header/>
      <div className="flex text-xl h-[30vh] bg-stone-600 text-white text-2xl font-bold mt-14">
        <h1 className="pl-[45vw] pt-[14vh]">About Us</h1>
      </div>

      <div className="grid grid-cols-3 h-[20%] bg-white h-[30vh] mr-2 items-center mt-10">
        <div  className="bg-white p-3 m-3">
          <h1 className="font-bold text-4xl">
            <span className="text-sky-500">Revolutionizing </span>
            Forex Trading with AI-Powered Bots!</h1>
        </div>
        <div  className="bg-white p-3 m-3 w-[26vw]">
          <h1>Harum quisquam amet debitis pariatur quas? Nemo excepturi duis minim nostrud officiis dolorem fugit itaque, fugiat excepturi modi, porta.</h1>
        </div>
        <div className="bg-white p-3 m-3 w-[26vw]">
          <h1>Odio velit, odit, est, euismod aliquid luctus pharetra vero, condimentum, nostrum mi venenatis, mollit odio mi, unde semper adipiscing aut...</h1>
        </div>
      </div>
    
      <div className="grid grid-cols-3 pl-12 mt-20 mb-20">
      <div className="flex items-center gap-4 p-4 bg-white shadow-2xl rounded-lg w-[25vw] h-[20vh]">
          <div className="text-red-500 text-3xl">{<FaCheckCircle />}</div>
          <div>
            <h3 className="font-bold">Best Financial Analysis</h3>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white shadow-2xl rounded-lg w-[25vw] h-[20vh]">
          <div className="text-red-500 text-3xl">{<FaChartLine/>}</div>
          <div>
            <h3 className="font-bold">Financial Analysis</h3>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-4 bg-white shadow-2xl rounded-lg w-[25vw] h-[20vh] ">
          <div className="text-red-500 text-3xl">{<FaUsers />}</div>
          <div>
            <h3 className="font-bold">Professional Team</h3>
            <p className="text-gray-600 text-sm">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
          </div>
        </div>

      </div>

      <div className="flex flex-row ml-[10vw]">
        <div className="w-[40vw] h-[50vh]  bg-black m-8 rounded-lg"></div>
        <div className="w-[40vw] h-[40vh]  bg-stone-600 rounded-lg mt-[10vh] ml-[-20vh] "></div>
      </div>

      <div className="bg-stone-100 h-[120vh] w-[100vw] mt-10 pb-10">
        <h1 className=" font-bold text-2xl text-center pt-20">
          <span className="text-red-500 font-bold text-2xl"> Team</span>
          Members
        </h1>
        <p className="mt-10 mb-10 text-center">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
        <div className="flex justify-center gap-6 p-10 bg-gray-100">
          {members.map((member, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden w-64 text-center">
          <img src={member.image} alt={member.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">{member.name}</h3>
            {/* <p className="text-sm text-gray-500">{member.position}</p> */}
          </div>
          <div className="bg-red-500 text-white p-3 rounded-b-2xl">
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
        <p className="text-black font-bold text-2xl text-center">www.DownloadNew.Themes.com</p>
      </div>
      
      <div className="h-[60vh] w-[100%] bg-stone-800 grid grid-cols-4 flex pl-20 gap-4">
        
        <div className=" justify-center ">
          <p className="flex justify-center gap-7 p-3 text-gray-300">AGENCE</p>
          <p className="flex text-center p-3 text-gray-300">Lorem ipsum dolor sit amet consectetur adipiscing elit</p>
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
          <h1 className="pt-3 hover:text-gray-500">Careers</h1>
          <h1 className="pt-3 hover:text-gray-500">News and Articles</h1>
          <h1 className="pt-3 hover:text-gray-500">Legal Notice</h1>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold p-3"> Support</h1>
          <h1 className="pt-3 hover:text-gray-500">Help Center</h1>
          <h1 className="pt-3 hover:text-gray-500">Contact Us</h1>
          <h1 className="pt-3 hover:text-gray-500">Payment Center</h1>
          <h1 className="pt-3 hover:text-gray-500">Parent Community</h1>
        </div>

        <div className="justify-center text-gray-300">
          <h1 className="font-bold t p-3"> Contact Information</h1>
          <h1 className="pt-3 hover:text-gray-500">Feel free to contact and reach us!</h1>
          <h1 className="pt-3 hover:text-gray-500">3557 Derek Drive, Florida</h1>
          <h1 className="pt-3 hover:text-gray-500">+1(456)657-887, +01 2599 12</h1>
          <h1 className="pt-3 hover:text-gray-500">info@domain.com</h1>
        </div>
      </div>
    
    </div>
  );
}