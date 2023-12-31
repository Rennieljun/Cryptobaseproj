'use client';

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { AiOutlineClose } from 'react-icons/ai'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/app/api/auth/[...nextauth]/route';
import { UserAuth } from '@/context/AuthContext';
import Image from 'next/image';
const SavedCoin = () => {
    const [coins, setCoins] = useState([])
    const {user} = UserAuth();

    useEffect(()=> {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setCoins(doc.data()?.watchList)
        })
    }, [user?.email])

    const path = doc(db, 'users', `${user?.email}`);
    const deleteCoin = async (passId) => {
        try{
            const result  = coins.filter((item => item.id !== passId));
            await updateDoc(path, {
                watchList: result,
            })
        }catch(e) {
            console.error(e);
        }
    }

  return (
    <div>
        {coins?.length === 0 ? (
        <p>
            You don't have any coins saved. Please save a coin to add it to the watch list. {' '}
            <Link href='/' className='text-lg font-bold text-accent'>Click here to search coins.</Link>
        </p>
        ) : (
            <table className='w-full border-collapse text-center'>
                <thead>
                    <tr className='border-b'>
                        <th className='px-4'>Rank #</th>
                        <th className='text-left'>Coin</th>
                        <th className='text-left'>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {coins?.map((coin) => (
                        <tr key={coin.id} className='h-[60px] overflow-hidden'>
                            <td>{coin.rank}</td>
                            <td>
                                <Link href={`/coin/${coin.id}`}>
                                    <div className='flex items-center'>
                                        <img className='w-8 mr-4' src={coin.image} alt="/" />
                                        <div>
                                            <p className='hidden sm:table-cell'>{coin?.name}</p>
                                            <p className='text-gray-500 text-left text-sm'>{coin?.symbol.toUpperCase()}</p>
                                        </div>
                                    </div>
                                </Link>
                            </td>
                            <td className='pl-8'>
                                <AiOutlineClose 
                                onClick={() => deleteCoin(coin.id)}
                                className='cursor-pointer'/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}

export default SavedCoin