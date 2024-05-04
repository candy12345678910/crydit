import React, { useState, useEffect, useContext } from 'react'
import { motion } from "framer-motion"
import axios from 'axios';
import FlatCard from './FlatCard';
import Loading from './Loading';
import CompareGraph from './CompareGraph';
import { info } from './info';
import { Graph, Graph2 } from './GraphData';
import { Mycontext } from './contextAPI';

const Compare = () => {

  const url=import.meta.env.VITE_EXCHANGE
  const [day, setDay]=useState(1)
  const [data,setData]=useState(null)
  const [message, setMessage]=useState(false)


  const [chart1, setChart1]=useState(Graph)
  const [chart2, setChart2]=useState(Graph2)

  const { firstCoinIndex, secondCoinIndex, setFirstCoinIndex, setsecondCoinIndex }=useContext(Mycontext)
  
  const [chartUrl1, setChartUrl1]=useState(null)
  const [chartUrl2, setChartUrl2]=useState(null)

   const getData=async ()=>{
          try{
              const { data }=await axios.get(url)
              setData(data)
              if(data)
              {
                  setChartUrl1(import.meta.env.VITE_COINSID+`${data[firstCoinIndex].id}`+"/market_chart?vs_currency=usd"+"&days="+`${day}`)
                  setChartUrl2(import.meta.env.VITE_COINSID+`${data[secondCoinIndex].id}`+"/market_chart?vs_currency=usd"+"&days="+`${day}`)
              }
          }catch(err){
              setData(info)
              setMessage(true)
              console.log("Error fetching data: ",err)
          }
      }
  const chartGet1=async ()=>{
    try{
    const { data }=await axios.get(chartUrl1)
    setChart1(data)
    }catch(err){
      console.log("API Problem, Too Many Request")
      setChart1(Graph)
      setMessage(true)
    }
  }
  const chartGet2=async ()=>{
    try{
    const { data }=await axios.get(chartUrl2)
    setChart2(data)
    }catch(err){
      console.log("API Problem, Too Many Request")
      setChart2(Graph2)
      setMessage(true)
    }
  }
  useEffect(()=>{
    if(data){
      setChartUrl1(import.meta.env.VITE_COINSID+`${data[firstCoinIndex].id}`+"/market_chart?vs_currency=usd"+"&days="+`${day}`)

      chartGet1()
    }
  },[firstCoinIndex,chartUrl1,day])

  useEffect(()=>{
    if(data){
      setChartUrl2(import.meta.env.VITE_COINSID+`${data[secondCoinIndex].id}`+"/market_chart?vs_currency=usd"+"&days="+`${day}`)

      chartGet2()
  }
  },[secondCoinIndex,chartUrl2,day])
  
  useEffect(()=>{
      getData()
  },[])
  console.log(day)
  return (
    <>
      { !data && !chartUrl1 && !chartUrl2?<Loading/>:
      <div className='h-[full] bg-[#040920]'>
        <motion.div 
             initial={{
              opacity: 0,
              y: 30
          }}
          animate={{
              opacity: 1,
              y: 0
          }}
          transition={{
              duration: 1
          }}
        className=' py-10 flex flex-col gap-[100px] items-center '>
          { message?<motion.div 
            initial={{opacity: 0, scale: .5}}
            animate={{ opacity: 1, scale: 1}}
            transition={{ duration: .4 }}
            className='text-[#d34040] font-semibold text-[1.5vmax] flex flex-col items-center justify-center'><p>Warning!! This is Old Data</p><p>Refresh The Page After a Minute to Get The Real Time Data</p></motion.div>:<></>}
          <div className='flex flex-col gap-5'>
            <FlatCard data={data} coin={firstCoinIndex} setCoin={setFirstCoinIndex}/>
            <FlatCard data={data} coin={secondCoinIndex} setCoin={setsecondCoinIndex}/>
          </div>

          <select className='flex gap-10 bg-[#1a2d63] px-6 py-3 font-medium text-[#bfcdde] rounded-[10px]'  onClick={(e)=>console.log(setDay(Number(e.target.value)))}>
            <option className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]" value="1">1d</option>
            <option className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]" value="7">7d</option>
            <option className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]" value="30">1m</option>
            <option className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]" value="90">3m</option>
            <option className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]" value="365">1y</option>
          </select>       
            
          {chart1 && chart2 ?
            <div>
            <CompareGraph className="px-1 sm:px-0" chart1={chart1} chart2={chart2} day={day} coin1={data[firstCoinIndex].name} coin2={data[secondCoinIndex].name}/>
            </div>
            :<div className="py-[1vmax] bg-[#040920] w-[100%] h-[50vh]">
            <motion.h1 className='text-center text-[2.1vmax] font-medium text-[#bfcdde] z-30'>Chart is Loading...</motion.h1>
          </div>
          }
        </motion.div>
      </div>
      }
    </>
  )
}



export default Compare