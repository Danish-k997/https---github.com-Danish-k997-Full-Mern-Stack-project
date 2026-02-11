import React from 'react'
import { assets } from '../assets/frontend_assets/assets'

const Footer = () => {
  return (
    <div>
     <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm text-gray-600'>    
    <div>
      <img className='mb-5 w-32' src={assets.logo} alt="logo" /> 
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
    </div>
       <div>
           <p className='text-xl font-medium mb-5' >COMPANY</p> 
            <ul className='flex flex-col gap-1 text-gray-600'>
              <li>Home</li>
              <li>Abouts us</li>
              <li>Delivery</li>
              <li>privacy policy</li>
            </ul>
       </div>  
       <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p> 
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+1256-789-908</li>
          <li>forver@gmail.com</li>
        </ul>         
       </div> 
       <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024@ forever.com - All Right Reserved.</p>
       </div>
    </div>
    </div>
  )
}

export default Footer
