'use client';
import './settings.css';
import { SetStateAction, useState } from 'react';
import { getCookie } from 'cookies-next';

const SettingsPage = () => {
    const [selectedStrategy, setSelectedStrategy] = useState('');

    // Handle radio button change
    const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedStrategy(event.target.value);
    };

    const token = getCookie('userToken');
    // Handle form submission
    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!token || !selectedStrategy) {
            alert('Please provide a token and select a strategy.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/save-strategy/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    strategy: selectedStrategy,
                    trading: false,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Response:', data);
                alert('Strategy saved successfully!');
            } else {
                console.error('Error:', data);
                alert('Error saving strategy. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Error connecting to the server.');
        }
    };

    return (
        <div className='settings-div'>
            <h1 className='tittle-set'>Customise your Bot</h1>
            <p className='text-m description-text opacity-90'>Tailor your trading experience to suit your goals and risk tolerance. Adjust key parameters and preferences to align with your trading strategy. Your customized settings will help the app operate exactly how you want it to.</p>

            <div className='strategy-div'>
                <div className='small-divs flex flex-col '>
                    <h2>Strategy</h2>
                    <p className='text-m description-text opacity-90'>Choose a strategy that best fits your trading goals. Each strategy is designed with specific objectives and market conditions in mind.</p>
                </div>
                <div className='small-divs flex flex-col'>
                    <h2>Choose your strategy below</h2>
                    <form className='w-full h-fit mt-4' onSubmit={handleSubmit}>
                        <div className='flex flex-row items-center '>
                            <input className='mr-2 boxes-str' type="radio"
                                checked={selectedStrategy === 'Moving_averages'}
                                value="Moving_averages"
                                onChange={handleRadioChange}></input>
                            <label className='text-m description-text opacity-90 '>Moving averages</label>
                        </div>
                        <div className='flex flex-row items-center '>
                            <input className='boxes-str mr-2' name='mal' id='mal' type="radio"
                                checked={selectedStrategy === 'malysian'}
                                value="malysian"
                                onChange={handleRadioChange}></input>
                            <label htmlFor='mal' className='text-m description-text opacity-90 ml-2'>Malysian strategy</label>
                        </div>
                        <div className='flex flex-row items-center '>
                            <input className='boxes-str mr-2 ' name='mal' id='mal' type="radio"
                                checked={selectedStrategy === 'both'}
                                value="both"
                                onChange={handleRadioChange}></input>
                            <label htmlFor='mal' className='text-m description-text opacity-90'>Both</label>
                        </div>
                        <input className='submitt mt-4' type='Submit'></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
