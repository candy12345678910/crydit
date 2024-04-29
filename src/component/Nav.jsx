import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import React from 'react'

const Nav = () => {

  const [dark, setDark]=useState(false)
  const toggle=()=>setDark(!dark)
  return (
    <div className={dark?"dark":""}>
      <div className="p-5 flex items-center justify-between  bg-[#268ad9] dark:bg-[#09122c] ">
          <p className="text-[1.7vmax] text-white">cryDit</p>
          <input type="type" className="pl-2 pr-2  h-[3vmax] w-[30%] text-[1vmax] outline-none rounded-[50px]"/>
          <ul className="flex items-center justify-center gap-4">
              <li className="text-[1.1vmax]  text-white cursor-pointer" onClick={ toggle }>Dark</li>
              <li className="text-[1.1vmax]  text-white">Home</li>
              <li className="text-[1.1vmax]  text-white">Compare</li>
              <li className="text-[1.1vmax]  text-white">Watchlist</li>
          </ul>
      </div>
    </div>
  )
}

export default Nav