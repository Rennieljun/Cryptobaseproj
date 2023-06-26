'use client';

import SavedCoin from '@/components/SavedCoin'
import { UserAuth } from '@/context/AuthContext'
import { useRouter } from 'next/navigation'
import Signin from '@/components/Signin';
import { useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/app/api/auth/[...nextauth]/route';

const page = () => {
    const {user, logout, addData} = UserAuth();
    const navigate = useRouter();
    const handleSignOut = async () => {
        try {
            await logout()
            navigate.push('/Home');
        }catch (e) {
            console.log(e.message);
        }
    }
  return (
    <div className='max-w-[1140px] mx-auto'>
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
            <div>
                <h1 className='text-2xl font-bold'>Account</h1>
                <div>
                    <p>Welcome, {user?.email}</p>
                </div>
            </div>
            <div>
                <Signin/>
            </div>
        </div>
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
            <div className='w-full min-h-[300px]'>
                <h1 className='text-2xl font-bold py-4'>Watch List</h1>
                <SavedCoin/>
            </div>
        </div>
    </div>
  )
}

export default page