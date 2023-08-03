'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useState } from 'react'

export default function ProfilePage () {
    const router = useRouter();
    const [data, setData] = useState('None')

    const logout = async () => {
        try {
            const response = await axios.get('/api/users/logout');
            toast.success('Logout Successful');
            router.push('/login'); 
        } catch (error: any) {
            console.log(error.message)
            toast.error('Error: ' , error.message);
        }
    }

    const getUserDetails =async () => {
        const response = await axios.get('/api/users/me');
        console.log(response.data);
        setData(response.data.data._id);
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className='p-3 rounded bg-green-500 '>{data === 'None' ? "User" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>

            <hr />
            <button onClick={getUserDetails} className="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Get User Details</button>
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">logout</button>
        </div>
    )
}