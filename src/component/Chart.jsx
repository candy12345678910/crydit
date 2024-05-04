import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Graph } from './GraphData'
import { motion } from "framer-motion"
import ChartGraph from './ChartGraph'
import axios from 'axios'

function Chart( { price } ) {
    const { id }=useParams()
    const [chart,setChart]=useState(null)
    const [day, setDay]=useState(1)
    const [message,setMessage]=useState("Chart is Loading...")

    let url=import.meta.env.VITE_COINSID+`${id}`+"/market_chart?vs_currency="+`${price.toLowerCase()}`+"&days="+`${day}`

    useEffect(()=>{
      async function chartGet(){
        try{
          const { data }=await axios.get(url)
          setChart(data)
          // console.log("In main useEffect: ",chart
        }catch(err){
          console.log("Too many clicks and  am poor")
          setChart(null)
          setMessage("Wait for a minute...")
        }
      }
      chartGet()

    },[day])
    
  return (
    <>
    {
      chart?
      <motion.div
          initial={{
              opacity: 0,
              y: 10
          }}
          animate={{
              opacity: 1,
              y: 0
          }}
          transition={{
              duration: 3
          }}
          
          className='flex flex-col items-center justify-center gap-[5vmax]'
      >
        <ul className='flex gap-10 bg-[#09132E] px-6 py-3 rounded-[10px]'>
          <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde] hover:text-[#F7931A]" onClick={()=>setDay(1)}>24h</li>
          <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde] hover:text-[#F7931A]" onClick={()=>setDay(7)}>7d</li>
          <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde] hover:text-[#F7931A]" onClick={()=>setDay(30)}>1m</li>
          <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde] hover:text-[#F7931A]" onClick={()=>setDay(90)}>3m</li>
          <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde] hover:text-[#F7931A]" onClick={()=>setDay(365)}>1y</li>
        </ul>
        <ChartGraph chart={ chart } day={ day }/>

      </motion.div>
      :
      <div className="py-[1vmax] bg-[#040920] w-[100%] h-[100%]">
        <motion.h1 className='text-center text-[2.1vmax] font-medium text-[#bfcdde] z-30'>{message}</motion.h1>
      </div>
    }
    </>
  )
}

export default Chart
