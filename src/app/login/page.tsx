'use client';
import "./login.css";

import React from 'react';
import { useState } from 'react';
import { getDatabase, ref, push, set } from 'firebase/database';
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics"; // Import isSupported from firebase/analytics
import firebaseConfig from '../firebase/config';
import { FormEvent } from 'react'; // Import FormEvent type
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";


// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default function Login() {
    
    const [error, setError] = useState<string>("");

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                console.log("User signed in:", user);
                // Store the user in local storage
                localStorage.setItem('user', JSON.stringify(user));

                //window.location.href = '/dashboard';
                window.location.href = '/dashboard';

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Error pushing data:', errorMessage);
                alert(errorMessage);
            });
    };
    return (
        <>
            <div className="flex loginsection ">
                <div className="w-full h-full insidelogin">
                    <div className="firstdiv">
                        <div className="w-full h-full contentdiv p-8 flex flex-col items-center justify-center">
                            <h1 className="text-white"><strong>Hello, </strong>Admin!</h1>
                            <p className='text-m text-white opacity-90'>You are now accessing the control center for managing and overseeing all aspects of our platform. From here, you can view and manage user data, update content, review analytics, and ensure smooth operations across the board.</p>
                        </div>
                    </div>

                    <div className="seconddiv">
                        <form className='w-full h-full p-8 flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                            <h1 id='in-form-head mb-4'>Login</h1>
                            <input className='aplyf' type="email" id="email" name="email" placeholder="Your email" required /><br />
                            <input className='aplyf' type="password" id="password" name="password" placeholder="Your Password" /><br />
                            <button className='aplyfs' type="submit" id="submit" name="submit"><p>Login</p></button><br />
                            {error && <p>{error}</p>} {/* Display error message if authentication fails */}
                        </form>
                    </div>

                </div>

            </div>
        </>
    )
}