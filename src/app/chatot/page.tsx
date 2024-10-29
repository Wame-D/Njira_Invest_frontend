'use client';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import './ai.css';
import { IoMdSend } from "react-icons/io";
import { RiRobot3Line, RiRobot3Fill } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";

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
        { text: "input: How does algorithmic trading work on this platform?" },
        { text: "output: Our algorithmic trading app automates trades based on market signals, allowing you to set your preferences and letting the app handle the rest." },
    
        { text: "input: Which brokers can I connect to on this platform?" },
        { text: "output: You can choose from a list of supported brokers, including Deriv, Broker B, and Broker C, depending on your preference and region." },
    
        { text: "input: How do I start trading here?" },
        { text: "output: First, select a broker from our list, authorize your account, and adjust your trading preferences. The app will begin automated trading based on your chosen settings." },
    
        { text: "input: Can I monitor my trades in real-time?" },
        { text: "output: Yes, our platform provides real-time updates, so you can view open trades, profits, and performance metrics 24/7 from your dashboard." },
    
        { text: "input: What type of trading strategies does the app use?" },
        { text: "output: The app uses a combination of strategies, including trend following, mean reversion, and scalping. Each strategy is optimized to match market conditions for maximum performance." },
    
        { text: "input: Can I customize the trading settings?" },
        { text: "output: Absolutely! You can customize risk levels, trading pairs, and strategy preferences to suit your goals and risk tolerance." },
    
        { text: "input: Do I need trading experience to use this platform?" },
        { text: "output: No experience needed! Our app is designed for all levels, with default settings for beginners and advanced customization options for experienced traders." },
    
        { text: "input: Is there a demo mode for testing?" },
        { text: "output: Yes, we offer a demo mode where you can test the trading features without risking real money. It’s a great way to learn the platform!" },
    
        { text: "input: How do I know my funds are safe?" },
        { text: "output: Security is our priority. We partner with trusted brokers who offer secure account handling, and we do not store or have access to your funds directly." },
    
        { text: "input: How can I withdraw my profits?" },
        { text: "output: To withdraw profits, simply access your broker’s platform, as funds remain securely within your broker account." },
    
        { text: "input: Are there any fees for using the trading app?" },
        { text: "output: Our platform has a monthly subscription, with no additional fees per trade. Check the pricing section for details." },
    
        { text: "input: What if I need help with setting up?" },
        { text: "output: Our support team is here 24/7! Reach out via live chat or email, and we’ll guide you through setup and answer any questions." },
    
        { text: "input: Can I stop automated trading anytime?" },
        { text: "output: Yes, you can pause or stop trading at any time directly from the dashboard. Your settings will be saved for when you’re ready to resume." }
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
            const maxLength = 500;
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
            <h2 id='chatname'>chatbot</h2>
            <h3 className='chatboticon'><RiRobot3Line /></h3>
            <hr id='hrqw'></hr>
            <div className='chatinside'>
                <div className='outputText '>

                    <div className='mainanswer'>
                        <div id='cover'>
                            <div id='cover2'>
                                <p id='userdata'> <FaUserAlt /> {inputText2} </p>
                            </div>
                        </div>
                        <br></br>
                        <p id='xheddata' >
                            <RiRobot3Fill style={{ color: 'rgb(5, 128, 230)', marginLeft: '10px' }} />
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
                        placeholder="Let's talk about trading"
                    />
                    <button ref={sendButtonRef} onClick={handleGenerate} id='sendbatton'><IoMdSend style={{ marginLeft: '15px', fontSize: '35px' }} /></button>
                </div>
            </div>
        </div>
    );
};

export default AiPage;

