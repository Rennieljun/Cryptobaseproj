'use client';
import axios from 'axios';
import {useEffect, useState } from 'react'
import CoinItem from '@/components/CoinItem';
import Trending from '@/components/Trending';
import { onSnapshot, doc } from 'firebase/firestore';
import { db } from '@/app/api/auth/[...nextauth]/route';
import { UserAuth } from '@/context/AuthContext';

const HOME = () => {
  const [coins, setCoins] = useState([])
  const [page, setPage] = useState(10);
  const [favCoin, setFavCoin] = useState([])
  const [searchText, setSearchText] = useState('')
  const {user} = UserAuth();
  
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${page}&page=1&sparkline=true&locale=en`;

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
    })
  }, [url])
  useEffect(()=> {
    onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
        setFavCoin(doc.data()?.watchList)
    })
}, [user?.email])
  const favCoins = coins.filter((item) => {
    const res = favCoin?.some(fav => fav.id == item.id);

    return res == true;
  });
  const unFavCoins = coins.filter((item) => {
    const res = favCoin?.some(fav => fav.id == item.id);

    return res == false;
  });
  const addPage = () => {
    if(page < 30){
      setPage((page)=> page += 10);
    }else{
      alert("Limit reached!")
    }
  }
  return (
    <>
    <div className='rounded-div my-4'>
      <div className='flex flex-col md:flex-row justify-between pt-4 pb-6 text-center md:text-right'>
        <h1 className='text-2xl font-bold my-2 '>Search Crypto</h1>
        <form action="">
            <input 
            type="text" 
            placeholder='Search a coin'
            onChange={(e) => setSearchText(e.target.value)}
            className='w-full bg-primary border border-input px-4 py-2 rounded-2xl shadow-xl '
             />
        </form>
      </div>
      <table className='w-full border-collapse text-center'>
        <thead>
            <tr className='border-b'>
                <th ></th>
                <th className='px-4'>#</th>
                <th className='text-left'>Coin</th>
                <th></th>
                <th>Price</th>
                <th>24h</th>
                <th className='hidden md:table-cell'>24h Volume</th>
                <th className='hidden sm:table-cell'>Mkt</th>
                <th >Last 7 days</th>
            </tr>
        </thead>
        <tbody>
            {favCoins?.filter((value) => {
              if(searchText === '') {
                return value
              }else if (value.name.toLowerCase().includes(searchText.toLocaleLowerCase())){
                return value
              }
            }).map((coin) => (
                <CoinItem key={coin.id} coin={coin}/> 
            ))}
            {unFavCoins?.filter((value) => {
              if(searchText === '') {
                return value
              }else if (value.name.toLowerCase().includes(searchText.toLocaleLowerCase())){
                return value
              }
            }).map((coin) => (
                <CoinItem key={coin.id} coin={coin}/> 
            ))}
            {user?.email == null ? (coins?.filter((value) => {
              if(searchText === '') {
                return value
              }else if (value.name.toLowerCase().includes(searchText.toLocaleLowerCase())){
                return value
              }
            }).map((coin) => (
                <CoinItem key={coin.id} coin={coin}/> 
            ))): (<></>)}
        </tbody>
      </table>
      <button onClick={()=> addPage()} className='w-full text-center text-xl py-5 hover:bg-secondary '>See more...</button>
    </div>
    <Trending/>
    </>
  )
}

export default HOME;