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
    const domain = "https://109.74.196.98";

    // Handle radio button change
    const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedStrategy(event.target.value);
    };

    // Handle form submission
    const [error1, setError1] = useState<string>("")
    const [success1, setSucces1] = useState<string>("")
    const [changed, setChanged] = useState(false)
    const [selectedSymbols, setSelectedSymbols] = useState<string[]>([]);
    const [save_symbol, setSymbolChange] = useState(false)

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        if (!token || !selectedStrategy) {
            setError1('Please provide a token and select a strategy.');
            return;
        }

        try {
            const response = await fetch(`${domain}/save-strategy/`, {
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
            const response = await fetch(`${domain}/save_symbols/`, {
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
                setSymbolChange(!save_symbol)
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
                const response = await fetch(`${domain}/choosen-strategy/?email=${email}`)

                const data = await response.json();

                if (response.ok) {
                    const strategy = data.strategy;
                    setStrategy(strategy);
                    setSucces1("");
                    setError1("");
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
                const response = await fetch(`${domain}/get_symbols/?email=${email}`)

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
    }, [email, save_symbol]);

    // Function to delete an item
    const [error, setError] = useState<string>("")
    const [success, setSuccess] = useState<string>("")
    const deleteItem = async (index: string) => {
        setError("")
        try {
            const response = await fetch(`${domain}/delete_symbols/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, index }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess("deleted successful")
                setSymbolChange(!save_symbol)
            } else {
                console.error('Error:', data);
                setError("failed to delete the symbol")
            }
        } catch (error) {
            console.error('Fetch error:', error);
            setError("failed to delete the symbol")
        }
    };


    // method to save risks data
    const [perTrade, setPerTrade] = useState<number | null>(null);
    const [perDay, setPerDay] = useState<number | null>(null);
    const [error3, setError3] = useState<string | null>(null);
    const [success3, setSuccess3] = useState<string | null>(null);
    const [saved_risk, setSaved] = useState(false)
    const saveRiskData = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (perTrade === null || perDay === null) {
            setError('Please fill in all fields');
            setSuccess("");
            return;
        }

        try {
            const response = await fetch(`${domain}/save_risks/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    per_trade: perTrade,
                    per_day: perDay,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess3('Risk data saved successfully');
                setSaved(!saved_risk)
                setError3("");
            } else {
                setError3(data.error || 'Failed to save risk data');
                setSuccess3("");
            }
        } catch (err) {
            setError3('An unexpected error occurred');
            setSuccess3("");
            console.error(err);
        }
    };

    // fetch risks data when page loads or when there is a change
    const [risk, setRisk] = useState<string[]>([]);
    useEffect(() => {
        const fetchRisk = async () => {
            try {
                const response = await fetch(`${domain}/get_risks/?email=${email}`)

                const data = await response.json();

                if (response.ok) {
                    const risk_data = data.risks;
                    console.log(risk_data);
                    setRisk(risk_data)
                    setSuccess3("")
                    setError3("")
                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchRisk();
    }, [email, saved_risk]);

    // method to save profit loss margin to database
    const [maxLossPerDay, setMaxLossPerDay] = useState<number | null>(null);
    const [overallLoss, setOverallLoss] = useState<number | null>(null);
    const [maxWinPerDay, setMaxWinPerDay] = useState<number | null>(null);
    const [overallWin, setOverallWin] = useState<number | null>(null);
    const [error4, setError4] = useState<string | null>(null);
    const [success4, setSuccess4] = useState<string | null>(null);
    const [startDate, setStartDate] = useState('');
    const [stopDate, setStopDate] = useState('');
    const today = new Date().toISOString().split('T')[0];
    const [saved_margins, setSavedMargis] = useState(false)
    const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedStartDate = event.target.value;
        setStartDate(selectedStartDate);

        // Calculate the default stop date (start date + 1 day)
        if (selectedStartDate) {
            const nextDay = new Date(selectedStartDate);
            nextDay.setDate(nextDay.getDate() + 1);
            setStopDate(nextDay.toISOString().split('T')[0]);
        } else {
            setStopDate('');
        }
    };

    const handleStopDateChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setStopDate(event.target.value);
    };

    const getMinStopDate = () => {
        if (startDate) {
            const nextDay = new Date(startDate);
            nextDay.setDate(nextDay.getDate() + 1);
            return nextDay.toISOString().split('T')[0];
        }
        // Default to tomorrow if no start date is selected
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    };

    const saveProfitLossMargin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!maxLossPerDay || !overallLoss || !maxWinPerDay || !overallWin || !startDate || !stopDate) {
            setError('Please fill in all fields');
            setSuccess("");
            return;
        }

        try {
            const response = await fetch(`${domain}/save_profit_and_loss/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    max_loss_per_day: maxLossPerDay,
                    overall_loss: overallLoss,
                    max_win_per_day: maxWinPerDay,
                    overall_win: overallWin,
                    start_date: startDate,
                    stop_date: stopDate,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess4('Profit and Loss margin saved successfully');
                setError4("");
                setSavedMargis(!saved_margins)
            } else {
                setError4(data.error || 'Failed to save profit/loss margin');
                setSuccess4("");
                console.log(data)
            }
        } catch (err) {
            setError4('An unexpected error occurred');
            setSuccess4("");
            console.error(err);
        }
    };

    const [margins, setMargin] = useState<string[]>([]);
    useEffect(() => {
        const fetchMargins = async () => {
            try {
                const response = await fetch(`${domain}/get_profit_and_loss/?email=${email} `)

                const data = await response.json();

                if (response.ok) {
                    const margin_data = data.data;
                    console.log(margin_data);
                    setMargin(margin_data)
                    setSuccess4("")
                    setError4("")

                    console.log(margins)
                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchMargins();
    }, [email, saved_margins]);

    const [isTrading, setIsTrading] = useState(false);
    // const [isComplete, setIsComplete] = useState(false);
    const handleStart = async () => {
        try {
            const inputDate = new Date(margins[0]);
            const today = new Date();

            // Compare year, month, and date
            if (
                inputDate.getFullYear() === today.getFullYear() &&
                inputDate.getMonth() === today.getMonth() &&
                inputDate.getDate() === today.getDate()
            ) {
                const response = await fetch(`${domain}/update-trading/`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        trading: true,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Response:', data);
                    alert('started trading successfully!');
                } else {
                    console.error('Error:', data);
                    alert('Error  Please try again.');
                }
            } else {
                alert(`your bot will trading on ${margins[0]}`);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Error connecting to the server.');
        }
        setIsTrading(true);
    };

    // Fetch the start_time when the page loads
    useEffect(() => {
        const fetchStartTime = async () => {
            try {
                const response = await fetch(`${domain}/Get-start-time/?email=${email}`)

                const data = await response.json();

                if (response.ok) {
                    const startTime = new Date(data.start_time).getTime();
                    const trading = data.trading;
                    const targetDate = new Date('2025-01-06T10:00:00').getTime();
                    if (startTime >= targetDate) {
                        if (trading == 1) {
                            setIsTrading(true);
                        }
                    }
                } else {
                    console.error('Error:', data);
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };

        fetchStartTime();
    }, [token]);


    const handleStop = async () => {
        setIsTrading(false);

        try {
            const response = await fetch(`${domain}/update-trading/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    trading: false,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Response:', data);
                alert('stoped trading successfully!');
            } else {
                console.error('Error:', data);
                alert('Error  Please try again.');
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
            <div className='strategy-div'>
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
            <div className='strategy-div'>
                <div className='small-divs flex flex-col '>
                    <h2>Risk Analysis</h2>
                    <p className='text-m description-text opacity-90'>Each symbol represents a currency pair designed to operate under specific market conditions and trading goals.</p>
                    <h3>Your current settings:</h3>
                    <p className='text-m description-text opacity-90'>Risk amount per trade: <span className='text-m strategy'>{risk[0]}%</span></p>
                    <p className='text-m description-text opacity-90'>Risk amount per trade: <span className='text-m strategy'>{risk[1]}%</span></p>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
                <div className='small-divs flex flex-col'>
                    <h2>Enter risk details below</h2>
                    <form className='w-full h-fit mt-4 flex flex-col' onSubmit={saveRiskData}>
                        <label className='text-m description-text opacity-70 mb-2'>Risk per trade, Max 3%</label>
                        <input
                            className="risk_boxes  mb-2"
                            type="number"
                            placeholder="Risk per trade"
                            max={3}
                            onChange={(e) => setPerTrade(Number(e.target.value))}
                        />
                        <label className='text-m description-text opacity-70 mt-4 mb-2'>Risk per Day, max 30% </label>
                        <input
                            className="risk_boxes"
                            type="number"
                            placeholder="Risk per day"
                            max={30}
                            onChange={(e) => setPerDay(Number(e.target.value))}
                        />
                        <input className="submitt mt-2" type="submit" value="Submit" />
                        {error3 && <p style={{ color: 'red' }}>{error3}</p>}
                        {success3 && <p style={{ color: 'green' }}>{success3}</p>}
                    </form>
                </div>
            </div>

            {/* start and stop setting settings */}
            <div className='strategy-div'>
                <div className='small-divs flex flex-col '>
                    <h2>Start and stop Settings</h2>
                    <p className='text-m description-text opacity-90'>Each symbol represents a currency pair designed to operate under specific market conditions and trading goals.</p>
                    <h3>Your settings:</h3>

                    <h3>Loss margin:</h3>
                    <p className='text-m description-text opacity-90'>Max loss per day: <span className='text-m strategy'>{margins[2]}%</span></p>
                    <p className='text-m description-text opacity-90'>Max overall loss: <span className='text-m strategy'>{margins[3]}%</span></p>

                    <h3>Win margin:</h3>
                    <p className='text-m description-text opacity-90'>Max Win per dat: <span className='text-m strategy'>{margins[4]}%</span></p>
                    <p className='text-m description-text opacity-90'>Max overall win: <span className='text-m strategy'>{margins[5]}%</span></p>

                    <h3>Time Frame:</h3>
                    <p className='text-m description-text opacity-90'>Start Date: <span className='text-m strategy'>{margins[0]}</span></p>
                    <p className='text-m description-text opacity-90'>Stop Date: <span className='text-m strategy'>{margins[1]}</span></p>

                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </div>
                <div className='small-divs flex flex-col'>
                    <h2>Enter your choices below</h2>
                    <form className="w-full h-fit mt-4 flex flex-col" onSubmit={saveProfitLossMargin}>
                        <h3>Maximum percentage loss margin</h3>
                        <label className='text-m mt-4 description-text opacity-70'>Max percentage loss per day</label>
                        <input
                            className="risk_boxes mb-4"
                            type="number"
                            placeholder="Max loss per day"
                            max={5}
                            onChange={(e) => setMaxLossPerDay(Number(e.target.value))}
                        />
                        <label className='text-m mt-2 description-text opacity-70'>Max percentage overall loss</label>
                        <input
                            className="risk_boxes"
                            type="number"
                            placeholder="Overall loss"
                            max={10}
                            onChange={(e) => setOverallLoss(Number(e.target.value))}
                        />
                        <h3>Maximum percentage win margin</h3>
                        <label className='text-m mt-2 description-text opacity-70'>Max percentage win per day</label>
                        <input
                            className="risk_boxes mb-4"
                            type="number"
                            placeholder="Max win per day"
                            max={30}
                            onChange={(e) => setMaxWinPerDay(Number(e.target.value))}
                        />
                        <label className='text-m mt-2 description-text opacity-70'>Max percentage overall win</label>
                        <input
                            className="risk_boxes mt-2"
                            type="number"
                            placeholder="Overall max win"
                            max={100}
                            onChange={(e) => setOverallWin(Number(e.target.value))}
                        />
                        <h3>When should the bot start/stop trading on your account?</h3>
                        <label className='text-m mt-2 description-text opacity-70'>Start Date</label>
                        <input
                            className="risk_boxes mb-4"
                            type="date"
                            placeholder="Start date"
                            value={startDate}
                            onChange={handleStartDateChange}
                            min={today}
                        />
                        <label className='text-m mt-2 description-text opacity-70'>Stop Date</label>
                        <input
                            className="risk_boxes mt-2"
                            type="date"
                            placeholder="Stop date"
                            value={stopDate}
                            onChange={handleStopDateChange}
                            min={getMinStopDate()}
                        />
                        <input
                            // disabled={!isComplete}
                            className="submitt mt-4"
                            type="submit" value="Submit" />
                        {error4 && <p style={{ color: 'red' }}>{error4}</p>}
                        {success4 && <p style={{ color: 'green' }}>{success4}</p>}
                    </form>
                </div>
            </div>

            {/* start and stop buttons */}
            <div className='strategy-div mb-8'>
                <div className='small-divs flex flex-col '>
                    <h2>You are all set</h2>
                    <p className='text-m description-text opacity-90'>You have set up all the neccessary information needed, you can now press the start trading button to authorise the bot to trade on your account</p>
                    <p className='text-m description-text opacity-90'>You can modify these settings anytime you want and they will be effective immediately, you can also stop the bot anytime you want y pressing stop trading button</p>
                </div>
                <div className='small-divss flex flex-row '>
                    <button
                        onClick={handleStart}
                        disabled={isTrading}
                        className={`button ${isTrading ? "disabled" : ""}`}
                    >
                        Start Trading
                    </button>
                    <button
                        onClick={handleStop}
                        disabled={!isTrading}
                        className={`button ${!isTrading ? "disabled" : ""}`}
                    >
                        Stop Trading
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;