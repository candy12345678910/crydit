import React from 'react'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { motion } from "framer-motion"
import { Link } from 'react-router-dom';

function Card({data,key}) {

  return (
    <Link to={`details/${data.id}`}>
        <motion.div
        initial={{ opacity: 0, y:10, }}
        animate={{ opacity: 1, y:0, }}
        transition={{ duration: .6 }}
        key={key} 
        className='flex flex-col gap-6 w-[20vmax] p-[1.5vmax] rounded-[7px] bg-[#12213e] cursor-pointer'>
            <div className='flex gap-3 dark'>
                <img className="h-[3vmax]" src={data.image} />
                <ul>
                    <li className='font-semibold text-[1.1vmax] text-white'>{data.symbol.toUpperCase()}</li>
                    <li className='font-medium text-[1vmax]  text-[#bfcdde]'>{data.name}</li>
                </ul>
            </div>
            <div className='flex flex-col gap-2'>
                <div className=' justify-between'>
                    <p className='flex gap-[10px] font-semibold text-[1.5vmax]  text-white'>Price: <span className={`${data.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-400"}`}>${data.current_price.toFixed(2)}</span>
                    <span className={`flex items-center justify-center font-medium text-[1vmax] ${data.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-400"}` }>{data.price_change_percentage_24h<0?<FaCaretDown />:<FaCaretUp />}{Math.abs(Math.round(data.price_change_percentage_24h))}%
                    </span>
                    </p>
                </div>
                <p className='font-semibold text-[1.2vmax] text-[#bfcdde]'>Total Volume: <span>{data.total_volume}</span></p>
                <p className='font-semibold text-[1.2vmax] text-[#bfcdde]'>Market Cap: <span>${data.market_cap}</span></p>
            </div>
        </motion.div>
    </Link>
  )
}

export default Card
