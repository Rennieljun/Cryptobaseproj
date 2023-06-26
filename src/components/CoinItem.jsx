'use client';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { UserAuth } from '@/context/AuthContext';
import { arrayUnion, doc, getDoc, updateDoc, onSnapshot} from 'firebase/firestore';
import { db } from '@/app/api/auth/[...nextauth]/route';
import {useRouter} from 'next/navigation';

const CoinItem = ({coin}) => {
  const [addedCoin, setAddedCoin] = useState([])
  const {user} = UserAuth();
  const router = useRouter();

  const path = doc(db, 'users', `${user?.email}`);
  const deleteCoin = async (passId) => {
    try{
    const result  = addedCoin.filter((item => item.id !== passId));
        await updateDoc(path, {
        watchList: result,
      })
      }catch(e) {
        console.error(e);
      }
  }
  const saveCoin = async (id) => {
    if(user?.email) {
      const data = addedCoin.some(item => item.id == id);
      if(data == false){
          await updateDoc(path, {
          watchList: arrayUnion({
            id: coin.id,
            name: coin.name,
            image: coin.image,
            rank: coin.market_cap_rank,
            symbol: coin.symbol
          })
        })
      }else {
        deleteCoin(id);
      }
      
    }else {
      alert('Please sign in to save coin in your watch list')
      router.push('/Signup')
    }
  }
    useEffect(()=> {
      onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
          setAddedCoin(doc.data()?.watchList)
      })
  }, [user?.email])

  return (
    <tr className='h-[80px] border-b overflow-hidden row-Animation'>
        <td onClick={() => saveCoin(coin.id)}>{addedCoin?.some(item => item.id === coin.id) ? <AiFillStar className='ease-in-out duration-300 hover:scale-150 cursor-pointer active:hue-rotate-180  hover:fill-yellow-300'/> : <AiOutlineStar className='ease-in-out duration-300 hover:scale-150 cursor-pointer hover:fill-yellow-300'/>}</td>
        <td>{coin.market_cap_rank}</td>
        <td>
          <Link href={`/coin/${coin.id}`}>
            <div className='flex items-center'>
                <img 
                    src={coin.image} 
                    alt={coin.id}
                    width={30}
                    height={30}
                    className='w-6 rounded-full'
                     />
                 <p className='hidden px-2 sm:table-cell'>{coin.name}</p>
            </div>
          </Link>
        </td>
        <td>{coin.symbol.toUpperCase()}</td>
        <td>${coin.current_price.toLocaleString()}</td>
        <td >
          {coin.price_change_percentage_24h > 0 ? (
          <p className='text-green-600'>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
          ) : (
            <p className='text-red-600'>
            {coin.price_change_percentage_24h.toFixed(2)}%
          </p>
          )}
        </td>
        <td className='w-[180px] hidden md:table-cell '>${coin.total_volume.toLocaleString()}</td>
        <td className='w-[180px] hidden sm:table-cell'>${coin.market_cap.toLocaleString()}</td>
        <td>
        <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color='lightgreen' />
        </Sparklines>
        </td>
    </tr>
  )
}

export default CoinItem