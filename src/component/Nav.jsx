import { motion } from "framer-motion"
import { FaEthereum } from "react-icons/fa";
import { Link, Outlet } from 'react-router-dom';
import Footer from './Footer';


const Nav = () => {

  return (
    <div>
      <div className="py-5 px-10 flex items-center justify-between  bg-[#09122c] ">
          <p className="text-[2vmax] font-semibold text-[#bfcdde] flex items-center">CryDit <motion.span 
    animate={{ scale: 1 }}
    transition={{ duration: 1, loop: Infinity }}
    whileHover={{ scale: 1.1 }}
    ><FaEthereum className="text-amber-500"/></motion.span></p>
          <ul className="flex items-center justify-center gap-5">
              <Link to='/'><li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]">Home</li></Link>
              <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]">Compare</li>
              <li className="text-[1.1vmax] font-medium cursor-pointer text-[#bfcdde]">Watchlist</li>
          </ul>
      </div>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default Nav