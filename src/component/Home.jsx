import React, { useEffect, useState } from 'react'
import { info } from './info'
import axios from 'axios'
import Card from './Card'
import { motion } from "framer-motion"
function Home() {
    const url=import.meta.env.VITE_EXCHANGE
    const [data,setData]=useState(info)
    const [ search, setSearch]=useState("")
    useEffect(()=>{
        // const getData=async ()=>{
        //     try{
        //         const { data }=await axios.get(url)
        //         setData(data)
        //     }catch(err){
        //         console.log("Error fetching data: ",err)
        //     }
        // }
        // getData()
        // setData(info)
    },[])

  return (
    <div className='py-10 bg-[#040920] flex flex-col justify-center items-center gap-8'>
        <input type="type" className="p-5 text-[#bfcdde]  bg-[#18254a] h-[3vmax] w-[70%] text-[1vmax] outline-none rounded-[50px]" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
        
        <motion.div className='px-2 py-8 flex item-center justify-evenly gap-6 flex-row flex-wrap  bg-[#040920]'>
        {
            data.filter((i)=>i.name.toLowerCase().startsWith(search.toLowerCase())).map((i,index)=><Card data={i} key={index} />)
        }
        </motion.div>
        <motion.div className='px-2 py-8 flex item-center justify-evenly gap-6 flex-row flex-wrap  bg-[#040920]'>
        {
            data.map((i,index)=><Card data={i} key={index} />)
        }
        </motion.div>
        
    </div>
  )
}

export default Home
