import React, { useEffect, useState } from 'react'
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import { useParams } from 'react-router-dom'
import { motion } from "framer-motion"
import Loading from './Loading'
import axios from 'axios'
import { Alldata } from './Alldata'
import Chart from './Chart';

const Details = () => {
    const { id }=useParams()
    const [ details,setDetails]=useState(Alldata)
    const url=import.meta.env.VITE_COINSID
    useEffect(()=>{
        async function getDetails(){
            try{
                const { data }=await axios.get(url+`${id}`)
                setDetails(data)
            }catch(err){
                // console.log("Details has too mny clicks")
                setDetails(null)
            }
        }
        getDetails()
    },[])
    return (
        <motion.div>{!details?<Loading/>:<CoinDetails details={ details }/>}</motion.div>
    )
}

const CoinDetails=({details})=>{
    const [price, setPrice]=useState("USD")

    return(
        <div className='bg-[#040920] flex flex-col h-[100%] items-center py-10'>
            
            <div>
                <label className='font-semibold text-[1.5vmax] text-white' for="type" >Currency: </label>
                <select className='text-[1vmax] px-[1.5max] py-[.5vmax] border-none font-medium bg-[#0f1d45] rounded-[5px] text-white' name="type" id="type" onClick={(e)=>setPrice(e.target.value.toLowerCase())}>
                    <option >USD</option>
                    {
                        Object.keys(details.market_data.current_price).map((i)=><option>{i.toUpperCase()}</option>)
                        // Object.keys(details.market_data.current_price).filter(i=>i.toUpperCase()!=price).map((i)=><option>{i.toUpperCase()}</option>)
                    }
                </select>
            </div>

            <div className='py-10 overflow-hidden flex flex-row flex-wrap items-center justify-center gap-3'>

                <div className='p-8 flex rounded-[20px] flex-col gap-4 bg-[#09132e] w-[30vmax]'>
                    <div className='flex item-center justify-start gap-5'>
                        <img className="h-[5vmax]" src={details.image.large} />
                        <ul>
                            <li className='font-semibold text-[3vmax] text-white'>{details.symbol.toUpperCase()}</li>
                            <li className='font-medium text-[2vmax]  text-[#bfcdde]'>{details.name}</li>
                        </ul>
                        <p className='font-semibold text-[2vmax] text-white'>#{details.market_cap_rank}</p>
                    </div>
                    <p className='font-semibold text-[3vmax] text-white'>
                        {details.market_data.current_price[price.toLowerCase()].toFixed(2)} <span className='text-[1.3vmax]'>{price.toUpperCase()}</span> <span className={`flex item-center gap-2 font-medium text-[1.4vmax] ${details.market_data.price_change_percentage_24h<0?"text-red-500" : "text-green-400"}`}>{details.market_data.price_change_percentage_24h<0?<FaCaretDown />:<FaCaretUp />}{Math.abs(details.market_data.price_change_percentage_24h.toFixed(1))} %</span></p>
                    
                    <p className='font-semibold text-[1.2vmax] text-[#bfcdde]'>Market Cap:  {details.market_data.market_cap[price.toLowerCase()]} <span className='font-medium text-[1vmax] text-[#bfcdde]'>{price.toUpperCase()}</span></p>
                    
                    <p className='font-semibold text-[1.2vmax] text-[#bfcdde]'>Fully Diluted Valuation:  {details.market_data.fully_diluted_valuation[price.toLowerCase()]} <span className='font-medium text-[1vmax] text-[#bfcdde]'>{price.toUpperCase()}</span></p>
                    
                    <p className='font-semibold text-[1.2vmax] text-[#bfcdde]'>Total Volume:  {details.market_data.total_volume[price.toLowerCase()]} <span className='font-medium text-[1vmax] text-[#bfcdde]'>{price.toUpperCase()}</span></p>

                    <div className='  font-medium text-[1vmax] text-justify text-[#bfcdde]'>
                        {details.description.en.split('.')[0]}
                    </div>
                </div>

                <Chart price={ price } color="orange"/>

            </div>
        </div>
    )
}

export default Details