'use client';

import Link from 'next/link';
import React, { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';


export default function () {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisable, setButtonDisable] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0){
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user])

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup' , user);
            console.log("Signup Success: " , response.data);
            router.push("/login");
        } catch (error: any) {
            console.log("Signup Failed: ", error.message)
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Please Wait..." : "Sign Up"}</h1>

            <hr />

            <label htmlFor="username">Username</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600 text-black background-black appearance-none'
                type="text"
                name="username"
                id="username"
                placeholder='Username'
                onChange={(e) => {
                    setUser({
                        ...user, username: e.target.value
                    })
                }}
                />

            <label htmlFor="email">Email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600 text-black background-black appearance-none'
                type="text"
                name="email"
                id="email"
                placeholder='Email'
                onChange={(e) => {
                    setUser({
                        ...user, email: e.target.value
                    })
                }}
                />

            <label htmlFor="password">Password</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600 text-black background-black appearance-none'
                type="password"
                name="password"
                id="password"
                placeholder='Password'
                onChange={(e) => {
                    setUser({
                        ...user, password: e.target.value
                    })
                }}
            />

            <button
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                onClick={onSignup}
            >
                {buttonDisable ? "Form Empty!" : "Sign Up"}
            </button>

            <Link href='/login'>Already have an account? Login instead</Link>
        </div>
    )
}