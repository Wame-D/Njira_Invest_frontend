import './settings.css';
const SettingsPage = () => {
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
                    <form className='w-full h-fit mt-4'>
                        <div className='flex flex-row items-center '>
                            <label className='text-m description-text opacity-90 '>Moving averages</label>
                            <input className='ml-2 boxes-str' type='checkbox'></input>
                        </div>
                        <div className='flex flex-row items-center '>
                            <label htmlFor='mal' className='text-m description-text opacity-90'>Malysian strategy</label>
                            <input className='boxes-str ml-2' name='mal' id='mal' type='checkbox'></input>
                        </div>
                        <input className='submitt mt-4' type='Submit'></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
