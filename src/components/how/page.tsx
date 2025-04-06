import "./how.css";
// import { motion } from 'framer-motion';
// import { useInView } from "react-intersection-observer";
// import dynamic from 'next/dynamic';
// import { DiEnvato } from "react-icons/di";

// const MotionDiv = dynamic(() => import('framer-motion').then(mod => mod.motion.div), { ssr: false });


export default function HowItWork() {
    // //framer motion
    // const { ref, inView } = useInView({
    //     triggerOnce: false,
    //     threshold: 0.1,
    // });

    return (
        <>
            <div className=" items-center flex flex-col justify-center  h-fit w-full how-it-works ">
                <div className="h-full w-full inside-how pt-20 items-center flex flex-col justify-center">
                    <h2 id="how-it-work-t" className="mb-12">HOW IT WORKS</h2>
                    <div
                        // ref={ref}
                        // initial={{ opacity: 0, y: 50 }}
                        // animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                        // transition={{ duration: 1, ease: 'easeOut' }}
                        className="flex body-div ">
                        <div className="cards  items-center flex flex-col ">

                            <div className="w-full flex flex-row  number1-div">
                                <div className="items-center flex justify-center number-div mr-4 number1">
                                    <h2>1</h2>
                                </div>
                                <div className=" flex flex-col ">
                                    <h2 className="text-white titles-in-how">Choose Your Broker</h2>
                                    <p className='text-m text-white opacity-70'>Select a supported broker to connect your trading account to our platform. We support multiple brokers for flexibility and ease of access.</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row  number2-div">
                                <div className="items-center flex justify-center number-div mr-4 number2">
                                    <h2>2</h2>
                                </div>
                                <div className=" flex flex-col">
                                    <h2 className="text-white titles-in-how">Login & Authorize</h2>
                                    <p className='text-m text-white opacity-70'>Securely log in using your broker’s credentials. Once authorized, you can view your account details and trading dashboard, keeping you in control.</p>
                                </div>
                            </div>

                        </div>

                        <div className="cards items-center flex flex-col">

                            <div className="w-full flex flex-row  number3-div">
                                <div className="items-center flex justify-center number-div mr-4 number3 ">
                                    <h2>3</h2>
                                </div>
                                <div className=" flex flex-col">
                                    <h2 className="text-white titles-in-how">Automated Trading</h2>
                                    <p className='text-m text-white opacity-70'>Our algorithm executes trades on your behalf, analyzing market trends and performing trades based on preset strategies. You can monitor each trade in real-time, 24/7.</p>
                                </div>
                            </div>

                            <div className="w-full flex flex-row  number4-div">
                                <div className="items-center flex justify-center number-div mr-4 number4">
                                    <h2>4</h2>
                                </div>
                                <div className=" flex flex-col">
                                    <h2 className="text-white titles-in-how">Manage Trades & Track Performance</h2>
                                    <p className='text-m text-white opacity-70'>View your trade history, analyze performance, and adjust settings as needed. Our platform provides insights into your portfolio, helping you make informed decisions and track growth.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}