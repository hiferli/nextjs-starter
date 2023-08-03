'use client'

import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'


export default function ProfilePage () {
    const router = useRouter();

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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>

            <hr />
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">logout</button>
        </div>
    )
}