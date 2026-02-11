import React from 'react'
import axios from 'axios' 
import { backendurl } from '../backend';
import {  toast } from 'react-toastify';

const Login = ({setToken}) => {

const [email,setEmail] = React.useState("");
const [password,setPassword] = React.useState("");
const onSubmitHandler = async (event) => {
  try {
    event.preventDefault();
    console.log(email,password);
     const response = await axios.post(backendurl + "/api/user/adminLogin",{
        email,
        password
      })
     if (response.data.success) {
       setToken(response.data.token)
       console.log(response.data);
       
     } else {
      toast.error(response.data.message) 
     }
  } catch (error) {
    console.log(error);
    toast.error(error.message)
  }
}

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center text-gray-700'>Admin Login</h2>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 mb-2'>Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} id="email" type="email" className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your email' />
          </div>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 mb-2'>Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} id="password" type="password" className='w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500' placeholder='Enter your password' />
          </div>
          <button type='submit' className='w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200'>Login</button>
        </form>
      </div>      
    </div>
  )
}

export default Login
