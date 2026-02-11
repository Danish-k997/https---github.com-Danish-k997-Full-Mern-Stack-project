import React from 'react'
import { ShopContext } from '../context/ShopContext'
import { useContext,useEffect } from 'react'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'


const Verify = () => {
  const {token,setCartItems,navigate,backendurl} = useContext(ShopContext);
  const [searchParams,setSearchParams] = useSearchParams();
  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyPayment = async () => {
    try {
      if(!token){
        return null;
      }
      const response = await axios.post(backendurl + '/api/order/verifyStripe',{success,orderId},{headers:{token}})
      if(response.data.success){
        setCartItems({})
        navigate('/orders')
      }else{
        navigate('/cart')
      }
    } catch (error) {
      console.log(error);
     navigate('/cart')
    }
  }

  useEffect(()=>{
    verifyPayment();
  },[token])
  return (
    <div>
      x
    </div>
  )
}

export default Verify
