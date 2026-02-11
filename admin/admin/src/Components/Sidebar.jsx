import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
      <div className='flex flex-col gap-4 pt-6 '>
              <NavLink className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm text-gray-500 hover:bg-gray-100" to="/add">
                <img src={assets.add_icon} alt="add"  />
                <p className='hidden md:block'>Add Items</p>
              </NavLink>
               <NavLink className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm text-gray-500 hover:bg-gray-100" to="/list">
                <img src={assets.order_icon} alt="list"  />
                <p className='hidden md:block'>List Items</p>
              </NavLink>
               <NavLink className="flex items-center gap-3 border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm text-gray-500 hover:bg-gray-100" to="/orders">
                <img src={assets.order_icon} alt="orders"  />
                <p className='hidden md:block'>Orders</p>
              </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
