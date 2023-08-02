'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { axios } from 'axios';


export default function LoginPage () {
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Login</h1>

            <hr />

            <label htmlFor="email">Email</label>
            <input
                className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600'
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
                className='text-sky-400 p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus: border-gray-600'
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