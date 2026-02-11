import React, { useContext,useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import Productitems from './Productitems'

const LetestCollection = () => { 
 
  const {products} = useContext(ShopContext)
  const [latestproducts,setlatestproducts] = useState([]);
                         
  useEffect(()=>{
   setlatestproducts(products.slice(0,10));
  },[products])
              
  return (
   <div className='my-10'>
     <div className='text-center py-8 text-3xl'>
      <Title text1="LATEST" text2="COLLECTION"/>
      <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Discover our latest collection of trendy and stylish products, carefully curated to keep you ahead in fashion. Explore now and elevate your style with our newest arrivals.
      </p>
     </div> 
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            latestproducts.map((item,index)=>(
               <Productitems key={index} id={item._id} name={item.name} image={item.image} price={item.price} />  
            ))
            }
      </div>
   </div>
  )
}

export default LetestCollection
   