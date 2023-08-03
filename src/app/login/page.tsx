'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { NextResponse } from 'next/server';
import { toast } from 'react-hot-toast';


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const [loading, setLoading] = useState(false)
    const [buttonDisable, setButtonDisable] = useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login successful: ", response.data);
            toast.success("Login Successful")
            router.push('/profile')
        } catch (error: any) {
            console.log("Error: Login Failed: " + error.message);
            toast.error(error.message)
        } finally {
            // return NextResponse.json({})
            setLoading(false)
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user])

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Please Wait..." : "Login"}</h1>

            <hr />

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
                onClick={onLogin}
            >
                Login Here!
            </button>

            <Link href='/signup'>New here? Sign up instead</Link>
        </div>
    )
}