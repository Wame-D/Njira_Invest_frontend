import Image from "next/image";
import Header from "./header/page";
import TopSection from "./topSection/page";
import Services from "./services/page";
import FAQPage from "./faq/page";
import Login from "./login/page";

export default function Home() {
  return (
    <>
      <div className=" items-center justify-items-center h-fit w-full ">
        <Header />
        <TopSection />
        <Services />
        < FAQPage />
      
        

      </div>
    </>
  );
}
