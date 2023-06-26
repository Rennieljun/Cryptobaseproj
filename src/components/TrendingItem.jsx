import React from 'react'

const TrendingItem = ({coin, key}) => {
  return (
    <div id={key} className="rounded-div flex justify-between p-4 hover:scale-105 ease-in-out duration-300 ">
    <div className="flex w-full items-center justify-between">
        <div className="flex">
            <img src={coin.item.small} alt="/" className="mr-4 rounded-full"/>
            <div>
                <p className="font-bold">{coin.item.name}</p>
                <p>{coin.item.symbol}</p>
            </div>
        </div>
    </div>
    <div className="flex items-center px-4">
        <img src='https://assets.coingecko.com/coins/images/1/large/bitcoin.png?154703379' 
        alt="/"
        className="w-4 mr-2"
        />
        <p>{coin.item.price_btc.toFixed(7)}</p>
    </div>
</div>
  )
}

export default TrendingItem