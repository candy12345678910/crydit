import React, { useEffect, useState } from 'react'
import { info } from './info'
import axios from 'axios'
import Card from './Card'
import Loading from './Loading'
import { motion } from "framer-motion"

function Home() {
    const url=import.meta.env.VITE_EXCHANGE
    const [message,setMessage]=useState(false)
    const [data,setData]=useState(null)
    const [range, setRange]=useState(0)
    const [ search, setSearch]=useState("?")
    let rangeSet=[]
    for(let i=range; i<(range+20);i++){
        rangeSet.push(i)
    }
    useEffect(()=>{
        const getData=async ()=>{
            try{
                const { data }=await axios.get(url)
                setData(data)
            }catch(err){
                console.log("Error fetching data")
                setMessage(true)
            }
        }
        getData()
        setData(info)
    },[])
    useEffect(()=>{
        (search.length===0)?setSearch("?"):""
    })
  return (
    <>
    {!data?<Loading/>:
        <div className='py-10 bg-[#040920] flex flex-col justify-center items-center gap-5'>
            { message?<motion.div 
            initial={{opacity: 0, scale: .5}}
            animate={{ opacity: 1, scale: 1}}
            transition={{ duration: .4 }}
            className='text-[#d34040] font-semibold text-[1.5vmax] flex flex-col items-center justify-center'><p>Warning: This is Old Data</p><p>Refresh The Page after a Minute to Get The Real Time Data</p></motion.div>:<></>}
            <input type="type" className="p-5 text-[#bfcdde]  bg-[#18254a] h-[3vmax] w-[70%] text-[1.5vmax] outline-none rounded-[50px]" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
            
            <motion.div className='px-2 py-2 flex item-center justify-evenly gap-6 flex-row flex-wrap  bg-[#040920]'>
            {
                data.filter((i)=>i.name.toLowerCase().startsWith(search.toLowerCase())).map((i,index)=><Card data={i} key={index} />)
            }
            </motion.div>
            <div className='bg-[#214570] w-[90vw] h-[.1vh]'></div>
            <motion.div className='px-2 py-8 flex item-center justify-evenly gap-6 flex-row flex-wrap  bg-[#040920]'>
            {
                rangeSet.map((i,index)=><Card data={data[i]} key={index} />)
            }
            </motion.div>
            <ul className="flex  gap-5">
                <li className='text-[1.2vmax] font-medium px-3 py-1 bg-[#b8d5f7] rounded-md text-[#2e3133] cursor-pointer hover:bg-blue-800 hover:text-white' onClick={() => setRange(0)}>1</li>

                <li className='text-[1.2vmax] font-medium px-3 py-1 bg-[#b8d5f7] rounded-md text-[#2e3133] cursor-pointer hover:bg-blue-800 hover:text-white' onClick={()=>setRange(20)}>2</li>

                <li className='text-[1.2vmax] font-medium px-3 py-1 bg-[#b8d5f7] rounded-md text-[#2e3133] cursor-pointer hover:bg-blue-800 hover:text-white' onClick={()=>setRange(40)}>3</li>

                <li className='text-[1.2vmax] font-medium px-3 py-1 bg-[#b8d5f7] rounded-md text-[#2e3133] cursor-pointer hover:bg-blue-800 hover:text-white' onClick={()=>setRange(60)}>4</li>

                <li className='text-[1.2vmax] font-medium px-3 py-1 bg-[#b8d5f7] rounded-md text-[#2e3133] cursor-pointer hover:bg-blue-800 hover:text-white' onClick={()=>setRange(80)}>5</li>      

                
            </ul>
        </div>
    }
    </>
  )
}

export default Home
