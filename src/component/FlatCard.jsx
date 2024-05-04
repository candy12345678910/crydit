import React, { useState, useContext, useEffect } from 'react'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { Mycontext } from './contextAPI';

const FlatCard=({data, coin, setCoin})=>{
    // const [ coin, setCoin]=useState(index)
  
    const getIndex=(e)=>{
        setCoin(data.findIndex(obj=>obj.name===e.target.value))
    }
    return(
      <div className='flex flex-row justify-between bg-[#12213e] w-[80vw] py-3 px-3 rounded-md'>
          <div className='flex items-center gap-5'>
            
            <img className="w-[4vmax]" src={data[coin].image} />
            
            <div className='hidden sm:block'>
              <p className='text-white text-[1.5vmax] font-medium'>{data[coin].symbol.toUpperCase()}</p>
              <p className='font-medium text-[1.3vmax]  text-[#bfcdde]'>{data[coin].name}</p>
            </div>

            <div className={`flex flex-row items-center gap-1 ${data[coin].market_cap_change_percentage_24h<0?"text-red-500" : "text-green-400"}`} >
              <p className='font-medium text-[1.6vmax] sm:text-[2vmax]'>$ {data[coin].current_price}</p>
              <FaCaretUp className={`text-[1.5vmax] `} />
              <p className='text-[1.3vmax] sm:text-[1.5vmax]'>{Math.abs(Math.floor(data[coin].market_cap_change_percentage_24h))}%</p>
            </div>
  
          </div>
  
          <select className='text-[1.2vmax] px-[1.2max] py-[.5vmax] border-none font-medium bg-[#1e2f5f] rounded-[5px] text-white' name="type" id="type" onClick={(e)=>getIndex(e)}>
            <option className="text-center" key={coin}>{data[coin].name}</option>
              {
                data.map((i,coin)=><option className="text-center" key={coin}>{i.name}</option>)
              }
          </select>
          
        </div>
    )
}

export default FlatCard