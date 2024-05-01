import React from 'react'
import { delay, motion } from "framer-motion"

const Loading = () => {

    const loader={
        animation: {
            scale: [1, 1.1]
        },
        transition: {
            duration: 2,
            yoyo: 10
        }
    }
  return (
    <div 
    className='flex items-center justify-center h-[100vh] bg-[#070d1f]'>
        <motion.p 
        variants={loader}
        animate="animation"
        transition="transition"
        className='text-[3vmax] font-bold text-[#bfcdde]'>Loading...</motion.p>
    </div>
  )
}

export default Loading