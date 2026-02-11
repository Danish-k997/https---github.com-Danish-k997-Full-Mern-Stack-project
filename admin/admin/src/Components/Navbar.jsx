import React from 'react'
import {assets} from '../assets/assets'
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center justify-between p-4'>
      <img className='w-[15%]' src={assets.logo} alt="Logo"  />
      <button onClick={()=>setToken("")} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors'>Logout</button>
    </div>
  )
}

export default Navbar
