'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import './ai.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCommentDots } from '@fortawesome/free-solid-svg-icons';

export interface Part {
    text: string;
}
export interface GenerateRequest {
    parts: Part[];
}
export interface GenerateResponse {
    response: {
        text: () => string; 
    };
}
// pages/index.tsx
import { GoogleGenerativeAI, GenerateContentResult } from "@google/generative-ai"; 
import dotenv from "dotenv";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const AiPage: React.FC = () => {
    dotenv.config();
    const genAI = new GoogleGenerativeAI('AIzaSyDvvn7kSAg8_F366H9ER9XOsHTyz0ACR7A');
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 100,
        responseMimeType: "text/plain",
    };

    const exampleConversations = [
        { text: "input: Can you explain your graphic design services?" },
        { text: "output: We specialize in creating graphics that capture the essence of your brand. Whether you need logos, illustrations, or visual branding" },
        { text: "input: What kind of websites do you design and develop?" },
        { text: "output:  from simple landing pages to complex e-commerce platforms. " },
        { text: "input: what services do you offer?" },
        { text: "output:  graphics, designing and developing websites, and mobile applications." },
        { text: "input: Tell me about your mobile application development services?" },
        { text: "output: Our mobile app development team specializes in creating custom applications for iOS and Android platforms. " },
        { text: "input: How does your company approach a new project?" },
        { text: "output: We begin by understanding your vision and goals." },
        { text: "input: Can I see examples of your previous work?" },
        { text: "output: Certainly! You can explore our portfolio on our website , showcasing our diverse projects in graphic design, website development, and mobile applications. Each project highlights our creativity and commitment to quality." },
        { text: "input: Hi" },
        { text: "output: Hi" },
        { text: "input: How do you ensure client satisfaction?" },
        { text: "output: Client satisfaction is our priority. We maintain open communication throughout the project," },
        { text: "input: What technologies and tools do you use for graphic design and development?" },
        { text: "output: We leverage industry-leading software and technologies tailored to each project's requirements. From Adobe Creative Suite for graphic design to robust frameworks like React and Swift for web and app development,." },
        { text: "input: hello" },
        { text: "output: Hey there! Welcome to Xhed Technologies. We're here to assist with anything you need. What can we do for you?" },
        { text: "input: What should I expect when working with your company?" },
        { text: "output: We're all about creating awesome graphics, websites that stand out, and apps that rock. Ready to dive in and make something great together?" },
        { text: "input: Is there someone I can talk to about starting a project?" },
        { text: "output: Hey! Absolutely, we've got just the team for that. you can use one of these contact :\nemail: info@xhed.net\nphone: +265990024684 (WhatsApp)" },
        { text: "input: I'm interested in your services. Where should I begin?" },
        { text: "output: Hey there! Awesome to hear you're interested. Let's chat about what you're looking for, and we'll tailor our approach to fit your needs perfectly. " },
        { text: "input: Tell me about your company." },
        { text: "output: Sure! Xhed Technologies specializes in creating stunning graphics, designing and developing websites, and crafting mobile applications. We focus on bringing our clients' ideas to life with creativity and technical expertise." },
        { text: "input: What is your company's mission?" },
        { text: "output: Our mission is to empower businesses and individuals through innovative design and technology solutions. We strive to exceed client expectations and foster long-term partnerships built on trust and quality." },
        { text: "input: Who are the founders of your company?" },
        { text: "output: Our company was founded by Mr. Daniel Wame. He started Xhed Technologies with a vision to blend creativity with technology, creating impactful solutions for our clients." },
        { text: "input: How can I contact your company?" },
        { text: "output: You can reach us via email at info@xhed.net,\n or give us a call at +265990024684.\n\n We're also active on social media, where you can connect with us for updates and inquiries." },
        { text: "input: Where is your company located?" },
        { text: "output: We are currently located in Zomba, Malawi." },
        { text: "input: What are your office hours?" },
        { text: "output: We work 24/7. Feel free to schedule a visit or contact us during these times. We're here to assist you with any questions or project inquiries." },
        { text: "input: How much do your services cost?" },
        { text: "output: Our pricing varies based on the scope and complexity of the project. We offer tailored quotes after understanding your specific needs." },
        { text: "input: Do you have a pricing list available?" },
        { text: "output: We customize our pricing for each project to ensure it meets your budget and requirements. Let's discuss your project details to provide a personalized quote." },
        { text: "input: What factors determine the cost of your services?" },
        { text: "output: Factors like project scope, complexity, timeline, and specific features e.g., number of website's pages influence our pricing." },
        { text: "input: Do you offer package deals or discounts?" },
        { text: "output: We occasionally offer package deals or discounts depending on the project and client needs. Let's discuss how we can best accommodate your budget." },
        { text: "input: Do you charge hourly rates or fixed prices?" },
        { text: "output: We offer both hourly rates and fixed-price options, depending on the nature of the project. We'll recommend the most suitable pricing structure based on your project scope and preferences." },
        { text: "input: How can I get a quote for my project?" },
        { text: "output: Getting a quote is easy! Simply reach out to us with details about your project, and we'll provide a customized quote tailored to your needs and budget." },
        { text: "input: How much does a website cost?" },
        { text: "output: Static websites typically range from 86.72USD (150,000MWK) depending on the number of pages and complexity.\n\nDynamic websites are more interactive and can range from  144.53USD (250,000MWK), varying with the number of pages and functionality." },
        { text: "input: How much does a Static website cost?" },
        { text: "output: Dynamic websites are more interactive and can range from  144.53USD (250,000MWK), varying with the number of pages and functionality." },
        { text: "input: How much does a dynamic website cost?" },
        { text: "output: Static websites typically range from 86.72USD (150,000MWK) depending on the number of pages and complexity." },
        { text: "input: Do you charge differently based on the number of pages?" },
        { text: "output: Yes, our pricing for websites considers factors like the number of pages, complexity of design, and functionality requirements. We tailor our quotes to ensure they reflect your specific project needs." },
        { text: "input: Are there additional costs for features like e-commerce or custom integrations?" },
        { text: "output: Yes, features like e-commerce or custom integrations may incur additional costs. We provide detailed quotes that outline all anticipated expenses upfront." },
        { text: "input: What motivates your team on a daily basis?" },
        { text: "output: Our team is motivated by the opportunity to make a positive impact through innovative solutions and meaningful collaborations with our clients." },
        { text: "input: What makes you different from other customer service bots?" },
        { text: "output: I'm designed to be personable and responsive, offering tailored assistance that reflects our company's commitment to customer satisfaction." },
        { text: "input: Do you have a sense of humor or do you stick strictly to business?" },
        { text: "output: While I prioritize professionalism, I can also inject a bit of humor if appropriate. I'm here to make your interaction informative and enjoyable." },
        { text: "input: do you fall in love?" },
        { text: "output: let's talk about business here.." },
        { text: "input: What is Your name?" },
        { text: "output: I am Xhed AI Helper and you?" },
        { text: "input: How much do you charge for logo design?" },
        { text: "output: Our logo design service starts at $3,  a unique and professional logo for your brand." },
        { text: "input: How much do you charge for flyer design?" },
        { text: "output: Our flyer design service starts at $5." },
        { text: "input: What is the cost for creating an illustration?" },
        { text: "output: Illustrations are priced from $10 depending on the complexity and style required." },
        { text: "input: What are your rates for designing marketing materials?" },
        { text: "output: Marketing materials, such as brochures and flyers, start at $5. Pricing may vary based on the project's scope." },
        { text: "input: How do you charge for branding services?" },
        { text: "output: Our branding services start at $9, covering everything from logo design to brand guidelines and marketing collateral." },
        { text: "input: Do you provide discounts for bulk orders?" },
        { text: "output: Yes, we offer discounts for bulk orders. Contact us with your requirements, and we'll provide a competitive quote." },
        { text: "input: What are your payment terms for design services?" },
        { text: "output: We require a 50% deposit upfront, with the remaining balance due upon project completion. We accept various payment methods for your convenience." },
        { text: "input: Do you offer revisions, and are they included in the price?" },
        { text: "output: Yes, we offer up to 3 revisions included in the initial price. Additional revisions may incur extra charges." },
        { text: "input: How much does a website cost?" },
        { text: "output: Website design pricing depends on the number of pages. For example, a 5-page website starts at $86.72USD (150,000MWK), and a 10-page website starts at $200." },
        { text: "input: What is the price for a small website with 3 pages?" },
        { text: "output: A small website with 3 pages starts at $57.71 (100,000MWK). This includes a homepage, about page, and contact page." },
        { text: "input: How much for a medium-sized website with 7 pages?" },
        { text: "output: A medium-sized website with 7 pages starts at $115.43 (200,000MWK). This package is ideal for businesses that need more detailed information on their site." },
        { text: "input: What are your rates for a large website with 15 pages?" },
        { text: "output: A large website with 15 pages starts at $288.57. This is perfect for businesses that need extensive content and features." },
        { text: "input: How much do you charge for adding additional pages to a website?" },
        { text: "output: Additional pages can be added for $20 per page. This allows you to expand your website as your business grows." },
        { text: "input: What is included in the price of a website design?" },
        { text: "output: Our website design prices include custom Domain name and design, responsive layout, and basic SEO. Additional features can be added based on your needs." },
        { text: "input: Do you offer e-commerce website design, and what are the costs?" },
        { text: "output: Yes, we offer e-commerce website design starting at $346.28 for up to 10 pages, including product pages, shopping cart, and checkout system." },
        { text: "input: Do you provide maintenance for websites, and what is the cost?" },
        { text: "output: Yes, we offer website maintenance packages starting at $50 per month, which include regular updates and backups." },
        { text: "input: How do you handle website redesigns, and what is the cost?" },
        { text: "output: Website redesigns start at $200. The final cost depends on the number of pages and the complexity of the redesign." },
    ];

    const [inputText, setInputText] = useState<string>("");
    const [outputText, setOutputText] = useState<string>("");
    const [inputText2, setInputValue] = useState('');
    const sendButtonRef = useRef(null)

    const handleGenerate = async () => {
         // Clear the input field
         setInputText("");
        const parts: Part[] = exampleConversations.concat({ text: `input: ${inputText}` });
        setInputValue(inputText);
        try {
            const result: GenerateContentResult = await model.generateContent({
                contents: [{ role: "user", parts }],
                generationConfig,
            });
            // Extract the text from the response
            let generatedText = result.response.text();
            const maxLength = 400;
            if (generatedText.length > maxLength) {
                generatedText = generatedText.substring(0, maxLength) + '...';
            }

            setOutputText(generatedText);
        } catch (error) {
            console.error("Error generating content:", error);
            setOutputText("Error generating content. Please try again.");
        }
       
    };
    const handleKeyPress = (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (sendButtonRef.current) {
                (sendButtonRef.current as HTMLButtonElement).click();
            }
        }
    };

    useEffect(() => {
        const inputElement = document.getElementById('userinput');
        if (inputElement) {
            inputElement.addEventListener('keypress', handleKeyPress);
        }
        return () => {
            if (inputElement) {
                inputElement.removeEventListener('keypress', handleKeyPress);
            }
        };
    }, []);

    return (
        <div className='aibody'>
            <div className='chatinside'>
                <div className='outputText '>
                    <h2 id='chatname'>Xhed ai</h2>
                    <hr id='hrqw'></hr>
                    <div className='mainanswer'>
                        <div id='cover'>
                            <div id='cover2'>
                                <p id='userdata'>{inputText2} <FontAwesomeIcon icon={faUser} /></p>
                            </div>
                        </div>
                        <br></br>
                        <p id='xheddata' >
                            <FontAwesomeIcon icon={faCommentDots} style={{ color: 'rgb(5, 128, 230)', marginLeft: '10px' }} />
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{outputText}</ReactMarkdown>
                        </p>
                    </div>
                </div>
                <div className='inputss'>
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        id='userinput'
                        placeholder="Let's talk about your project"
                    />
                    <button ref={sendButtonRef} onClick={handleGenerate} id='sendbatton'>Send</button>
                </div>
            </div>
        </div>
    );
};

export default AiPage;

