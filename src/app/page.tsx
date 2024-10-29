import Header from "./header/page";
import TopSection from "./topSection/page";
import Services from "./services/page";
import FAQPage from "./faq/page";
import HowItWork from "./how/page";

export default function Home() {
  return (
    <>
      <div className=" items-center justify-items-center h-fit w-full ">
        <Header />
        <TopSection />
        <Services />
        <HowItWork />
        < FAQPage />
      </div>
    </>
  );
}
