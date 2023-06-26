'use client';

import { useEffect, useState } from "react"
import axios from "axios";
import TrendingItem from "./TrendingItem";


const Trending = () => {
    const [trending, setTrending] = useState([])

    const url = 'https://api.coingecko.com/api/v3/search/trending';

    useEffect(() =>{
        axios.get(url).then((response) => {
            setTrending(response.data.coins);
        })
    },[])

  return (
    <div className="rounded-div my-12 py-8 text-primary">
        <h1 className="text-2xl font-bold py-4">Trending Coins</h1>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {trending.map((coin, key) => 
                <li key={key}>
                    <TrendingItem coin={coin}/>
                </li>
            )}
        </ul>
    </div>
  )
}

export default Trending