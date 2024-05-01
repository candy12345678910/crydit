import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Graph } from './GraphData'
import { motion } from "framer-motion"
import axios from 'axios'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );



function Chart( { price } ) {
    const { id }=useParams()
    const [chart,setChart]=useState(Graph)
    const [day, setDay]=useState(1)
    let url=import.meta.env.VITE_COINSID+`${id}`+"/market_chart?vs_currency="+`${price.toLowerCase()}`+"&days="+`${day}`
    // useEffect(()=>{
    //     async function chartGet(){
    //         const { data }=await axios.get(url)
    //         setChart(data)
    //     }
    //     chartGet()
    // },[day,chart])
    const chartData={
        labels: chart.prices.map((i)=>{
            const date=new Date(i[0])
            const time=date.getHours()>12?`${date.getHours()-12}:${date.getMinutes()}PM`:
            `${date.getHours()}:${date.getMinutes()}AM`
            return day===1?time:date.toLocaleString()
        }),
        datasets:[
            {
                label: `Price in Past ${day} Days`,
                data: chart.prices.map((i)=>i[1]),
                borderColor: "orange",
                borderWidth: '1',
            }
        ]
    }
    console.log(day)
  return (
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
            duration: 1
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

      <Line className="w-[100%] h-[30vmax] text-[1vmax]" data= { chartData } options={{
        elements:{
            point:{
                radius: 1,
            }
        }
      }}/>
    </motion.div>
  )
}

export default Chart
