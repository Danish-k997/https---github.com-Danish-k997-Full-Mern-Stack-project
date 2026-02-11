import React, { useContext, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import Productitems from '../components/Productitems'
const RelatedProducts = ({category,subCategory}) => {
  const {products} = useContext(ShopContext)
    
    const RelatedProductlist = useMemo(()=> {
        if (products.length > 0 ) {
          let productsCopy = products.slice();
          productsCopy = productsCopy.filter((item)=>category === item.category)
          productsCopy = productsCopy.filter((item)=>subCategory === item.subCategory)
          return productsCopy.slice(0,5)
        }
          
    },[products,category,subCategory])
     console.log(RelatedProductlist);
     
  return ( 
    <div className='my-12'>
      <div className='text-center text-3xl py-2'>
          <Title text1={'Related'} text2={'Products'}/>
      </div> 
      
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
          {
            RelatedProductlist.map((item,index)=>(
               <Productitems key={index} id={item._id} name={item.name} price={item.price} 
               image={item.image} />
            ))
          }
      </div>

    </div>
  )
}

export default RelatedProducts
