import React from 'react'
import { useState,useEffect } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Route,Routes } from 'react-router-dom'
import Add from './page/Add'
import List from './page/List'
import Order from './page/Order'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify';


  
const App = () => {
const [token,setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"):"");
  
useEffect(()=>{
  localStorage.setItem("token",token)
},[token])
  return (
    <div className='bg-gray-50 min-h-screen'> 
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> : 
       <>
      <Navbar setToken={setToken} /> 
      <hr /> 
      <div className='flex w-full'>
      <Sidebar /> 
      <div className='w-[70%] mx-auto my-8 text-gray-600 text-base'>
         <Routes>
          <Route path='/add' element={<Add token={token} />} />
          <Route path='/list' element={<List token={token} />} />
          <Route path='/orders' element={<Order token={token} />} />
          </Routes> 
        </div> 
        </div> 
      </> 
      }    
    </div>
  )
}

export default App
