'use client';

import SavedCoin from '@/components/SavedCoin'
import { UserAuth } from '@/context/AuthContext';
import Signin from '@/components/Signin';

const Accountpage = () => {
    const {user} = UserAuth();
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

export default Accountpage