'use client';
import "./login.css";
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import firebaseConfig from '../firebase/config';

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Login() {
    const [error, setError] = useState<string>("");
    const [selectedBroker, setSelectedBroker] = useState<string>(""); // State for selected broker

    const handleBrokerChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBroker(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User signed in:", user);
                localStorage.setItem('user', JSON.stringify(user));
                window.location.href = '/dashboard';
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error('Error signing in:', errorMessage);
                alert(errorMessage);
                setError(errorMessage); // Update error state
            });
    };

    return (
        <>
            <div className="flex loginsection">
                <div className=" insidelogin">
                    <div className="firstdiv">
                        <div className="w-full h-full contentdiv p-8 flex flex-col items-center justify-center">
                            <h1 className="text-white"><strong>Hello, </strong>User!</h1>
                            <p className='text-m text-white opacity-90'>Before you log in, please ensure you have selected the correct broker from the dropdown menu.</p>
                        </div>
                    </div>

                    <div className="seconddiv">
                        {/* Broker selection dropdown */}
                        <div className='w-full h-full p-2 flex flex-col items-center justify-center'>
                            {selectedBroker === "" && ( 
                                <>
                                    <h1 id='in-form-head' className='mb-4'>Choose Your Broker</h1>
                                    <select className='aplyf mb-4' value={selectedBroker} onChange={handleBrokerChange} required>
                                        <option value="first">Select a broker</option>
                                        <option value="">Deriv</option>
                                        <option value="otherBroker">Other Broker</option>
                                    </select>
                                    <button className='aplyfs mt-2' onClick={() => {
                                        if (selectedBroker === "") {
                                            window.location.href = 'https://oauth.deriv.com/oauth2/authorize?app_id=64953'; // Redirect to Deriv site
                                        }
                                    }}>
                                        <p>Next</p>
                                    </button>
                                </>
                            )}

                            {/* Conditional rendering for login form */}
                            {selectedBroker && selectedBroker !== "deriv" && (
                                <form className='w-full h-fit p-2 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                                    <h1 id='in-form-head' className='mb-3'>Login</h1>
                                    <input className='aplyf mb-0' type="email" id="email" name="email" placeholder="Your email" required /><br />
                                    <input className='aplyf' type="password" id="password" name="password" placeholder="Your Password" required /><br />
                                    <button className='aplyfs' type="submit" id="submit" name="submit">
                                        <p>Login</p>
                                    </button><br />
                                    {error && <p>{error}</p>} {/* Display error message if authentication fails */}
                                </form>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
