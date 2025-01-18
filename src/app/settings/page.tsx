'use client';
import './settings.css';
import { SetStateAction, useState } from 'react';
import { getCookie } from 'cookies-next';
import { useEffect } from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const SettingsPage = () => {
    const [selectedStrategy, setSelectedStrategy] = useState('');
    const email = getCookie('userEmail');
    const token = getCookie('userToken');

    // Handle radio button change
    const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedStrategy(event.target.value);
    };

    // Handle form submission
    const [error1, setError1] = useState<string>("")
    const [success1, setSucces1] = useState<string>("")
    const [changed, setChanged] = useState(false)
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!token || !selectedStrategy) {
            alert('Please provide a token and select a strategy.');
            return;
        }

        try {
            const response = await fetch('https://forex1-ul7ikrzn.b4a.run/save-strategy/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token,
                    email,
                    strategy: selectedStrategy,
                    trading: false,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Response:', data);
                setChanged(!changed)
                setSucces1('Strategy saved successfully!');
            } else {
                console.error('Error:', data);
                setError1('Error saving strategy. Please try again.');
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError1('Error connecting to the server.');
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const checked = event.target.checked;

        if (checked) {
            // Add symbol if it's not already in the array
            if (!selectedSymbols.includes(value)) {
                setSelectedSymbols([...selectedSymbols, value]);
            }
        } else {
            // Remove symbol if unchecked
            const updatedSymbols = selectedSymbols.filter(symbol => symbol !== value);
            setSelectedSymbols(updatedSymbols);
        }
    };

    const [error2, setError2] = useState<string>("")
    const [success2, setSucces2] = useState<string>("")
    const handleSymbolChange = async (event: React.FormEvent) => {
        event.preventDefault();
        setError2("")
        try {
            const response = await fetch('https://forex1-ul7ikrzn.b4a.run/save_symbols/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    token,
                    symbols: selectedSymbols
                }),
            });
            if (response.ok) {
                setChanged(!changed)
                setSucces2('Symbols saved successfully!');
                setSelectedSymbols([]);
            } else {
                setError2('Failed to save symbols.');
            }
        } catch (error) {
            console.log(error)
        }
    };

    // Fetch the strategy when the page loads
    const [strategy, setStrategy] = useState('');
    useEffect(() => {
        const fetchStartStrategy = async () => {
            try {
                const response = await fetch('https://forex1-ul7ikrzn.b4a.run/choosen-strategy/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    const strategy = data.strategy;
                    setStrategy(strategy);
                    setSucces1("")
                    console.log(strategy);
                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchStartStrategy();
    }, [token, changed]);

    const [symbols, setSymbols] = useState<string[]>([]);
    useEffect(() => {
        const fetchSymbols = async () => {
            try {
                const response = await fetch('https://forex1-ul7ikrzn.b4a.run/get_symbols/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                const data = await response.json();

                if (response.ok) {
                    const symbol = data.symbol;
                    console.log(symbols);
                    setSymbols(symbol);
                    setSuccess("")
                    setSucces2("")
                    setError("")
                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchSymbols();
    }, [token, changed]);

    // Function to delete an item
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const deleteItem = async (index: string) => {
        setError("")
        try {
            const response = await fetch('https://forex1-ul7ikrzn.b4a.run/delete_symbols/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, index }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("deleted successful")
                setChanged(!changed)
            } else {
                console.error('Error:', data);
                setError("failed to delete the symbol")
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError("failed to delete the symbol")
        }
    };

    return (
        <div className='settings-div'>
            <h1 className='tittle-set'>Customise your Bot</h1>
            <p className='text-m description-text opacity-90'>Tailor your trading experience to suit your goals and risk tolerance. Adjust key parameters and preferences to align with your trading strategy. Your customized settings will help the app operate exactly how you want it to.</p>
                {/* strategy analysis setting */}
            <div className='strategy-div'>
                <div className='small-divs flex flex-col '>
                    <h2>Strategy</h2>
                    <p className='text-m description-text opacity-90'>Choose a strategy that best fits your trading goals. Each strategy is designed with specific objectives and market conditions in mind.</p>
                    <h3>Your current strategy:</h3>
                    <p className='text-m strategy' >{strategy}</p>
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
                        {error1 && <p style={{ color: "red" }}>{error1}</p>}
                        {success1 && <p style={{ color: "green" }}>{success1}</p>}
                    </form>
                </div>
            </div>
            {/* symbols analysing settings */}
            <div className='strategy-div mb-16'>
                <div className='small-divs flex flex-col '>
                    <h2>Symbols</h2>
                    <p className='text-m description-text opacity-90'>Each symbol represents a currency pair designed to operate under specific market conditions and trading goals.</p>
                    <h3>Your current selected symbols:</h3>
                    <ul className=" mt-4 ml-6">
                        {symbols.map((item, index) => (
                            <li key={index} className="text-m description-text opacity-90">
                                <button
                                    onClick={() => deleteItem(item[0])}
                                    className=" mr-4"
                                >
                                    <FaTrashAlt className='delete_icon' />
                                </button>
                                {item[0]}
                            </li>
                        ))}

                    </ul>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
                <div className='small-divs flex flex-col'>
                    <h2>Choose symbols below</h2>
                    <form className='w-full h-fit mt-4' onSubmit={handleSymbolChange}>
                        <div className='flex flex-row items-center ' >
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "Gold") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="Gold"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "Gold") ? 'disabled-label' : ''}`}>Gold</label>
                        </div>

                        <div className='flex flex-row items-center '>
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "US_30") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="US_30"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "US_30") ? 'disabled-label' : ''}`}>US_30</label>
                        </div>

                        <div className='flex flex-row items-center'>
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "frxEURUSD") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="frxEURUSD"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "Euro/USD") ? 'disabled-label' : ''}`}>Euro/USD</label>
                        </div>

                        <div className='flex flex-row items-center '>
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "V_75") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="V_75"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "V_75") ? 'disabled-label' : ''}`}>V_75</label>
                        </div>

                        <input className='submitt mt-4' type='Submit'></input>
                        {error2 && <p style={{ color: "red" }}>{error2}</p>}
                        {success2 && <p style={{ color: "green" }}>{success2}</p>}
                    </form>
                </div>
            </div>
            {/* Risk analysis settings */}
            <div className='strategy-div mb-16'>
                <div className='small-divs flex flex-col '>
                    <h2>Risk Analysis</h2>
                    <p className='text-m description-text opacity-90'>Each symbol represents a currency pair designed to operate under specific market conditions and trading goals.</p>
                    <h3>Your current selected symbols:</h3>
                    <ul className=" mt-4 ml-6">
                        {symbols.map((item, index) => (
                            <li key={index} className="text-m description-text opacity-90">
                                <button
                                    onClick={() => deleteItem(item[0])}
                                    className=" mr-4"
                                >
                                    <FaTrashAlt className='delete_icon' />
                                </button>
                                {item[0]}
                            </li>
                        ))}

                    </ul>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
                <div className='small-divs flex flex-col'>
                    <h2>Choose symbols below</h2>
                    <form className='w-full h-fit mt-4' onSubmit={handleSymbolChange}>
                        <div className='flex flex-row items-center ' >
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "Gold") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="Gold"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "Gold") ? 'disabled-label' : ''}`}>Gold</label>
                        </div>

                        <div className='flex flex-row items-center '>
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "US_30") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="US_30"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "US_30") ? 'disabled-label' : ''}`}>US_30</label>
                        </div>

                        <div className='flex flex-row items-center'>
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "frxEURUSD") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="frxEURUSD"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "Euro/USD") ? 'disabled-label' : ''}`}>Euro/USD</label>
                        </div>

                        <div className='flex flex-row items-center '>
                            <input
                                className={`boxes-str mr-2 ${symbols.some((item) => item[0] === "V_75") ? 'disabled-box' : ''}`}
                                type="checkbox"
                                value="V_75"
                                onChange={handleCheckboxChange}></input>
                            <label className={`text-m description-text opacity-90 ${symbols.some((item) => item[0] === "V_75") ? 'disabled-label' : ''}`}>V_75</label>
                        </div>

                        <input className='submitt mt-4' type='Submit'></input>
                        {error2 && <p style={{ color: "red" }}>{error2}</p>}
                        {success2 && <p style={{ color: "green" }}>{success2}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
