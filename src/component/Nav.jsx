import { motion } from "framer-motion"
import { FaEthereum } from "react-icons/fa";
import { NavLink, Outlet } from 'react-router-dom';
import Footer from './Footer';


const Nav = () => {

  return (
    <div>
      <div className="py-5 px-10 flex items-center justify-between  bg-[#09122c] ">
        <NavLink to="/">
          <p className="text-[2vmax] font-semibold text-[#bfcdde] flex items-center">CryDit <motion.span 
            animate={{ scale: 1 }}
            transition={{ duration: 1, loop: Infinity }}
            whileHover={{ scale: 1.1 }}
            >
              <FaEthereum className="text-amber-500"/></motion.span>
          </p>
          </NavLink>
          <ul className="flex items-center justify-center gap-6">

              <NavLink to='/' className={({isActive})=>`text-[1.3vmax] font-medium cursor-pointer ${isActive?"text-amber-500":"text-[#bfcdde]"}`}>Home</NavLink>

              <NavLink to='/compare' className={({isActive})=>`text-[1.3vmax] font-medium cursor-pointer ${isActive?"text-amber-500":"text-[#bfcdde]"}`}>Compare</NavLink>

              {/* <li className="text-[1.3vmax] py-2 px-3 bg-[#538fff] rounded-md font-medium cursor-pointer text-[#e9f3ff] hover:bg-[#4078df]">Watchlist</li> */}
          </ul>
      </div>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Nav