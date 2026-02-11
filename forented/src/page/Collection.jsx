import React, { useContext, useState, useMemo } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets';
import Title from '../components/Title'
import Productitems from '../components/Productitems' 

const Collection = () => { 
   
  const {products, search,showSearch} = useContext(ShopContext)
  const [showfilter,setshowfilter]= useState(false);
 
  const [category,setcategory] = useState([]) 
  const [subCategory,setsubCategory] = useState([]) 
 const [sortType,setsortType] = useState('Relevant')
   

     
    const toggleCategory = (e)=>{
        if (category.includes(e.target.value)) {
            setcategory(prev => prev.filter(item => item !== e.target.value)) 
        } else{
            setcategory(prev => [...prev,e.target.value])
        }
    }  

     const toggleSubCategory = (e) => {
         if (subCategory.includes(e.target.value)) {
            setsubCategory(prev => prev.filter(item => item !== e.target.value)) 
         } else{
            setsubCategory(prev => [...prev,e.target.value])
         }
     }   

     const filteredProducts = useMemo(() => {
  let result = [...products];

  // category filter
  if (category.length > 0) {
    result = result.filter(item => category.includes(item.category));
  }

  // subCategory filter
  if (subCategory.length > 0) {
    result = result.filter(item => subCategory.includes(item.subCategory));
  }

  // sorting
  if (sortType === 'Low-high') {
    result.sort((a, b) => a.price - b.price);
  } 
  else if (sortType === 'High-low') {
    result.sort((a, b) => b.price - a.price);
  }  

  if (showSearch && search) {
     result = result.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
  }

  return result;
}, [products, category, subCategory, sortType, search, showSearch]);

 
      
  return (  
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
       <div className='min-w-60'>
          <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
            <img onClick={()=>setshowfilter(!showfilter)} className={`h-3 sm:hidden ${showfilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="dropdown" />
            </p> 
                
          <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' : 'hidden'} sm:block `}>
              <p className='mb-3 text-sm font-medium'>CATEGORIES</p> 
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2' >
                      <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Men'} />
                      Men
                  </p>
                  <p className='flex gap-2' >
                      <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Women'} />
                      Women
                  </p>
                  <p className='flex gap-2' >
                      <input onChange={toggleCategory} className='w-3' type="checkbox" value={'Kids'} />
                      kids
                  </p>
              </div>
          </div> 
            <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' :'hidden'} sm:block `}>
              <p className='mb-3 text-sm font-medium'>TYPE</p> 
              <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                  <p className='flex gap-2' >
                      <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Topwear'} />
                      Topwear
                  </p>
                  <p className='flex gap-2' >
                      <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Bottomwear'} />
                      Bottomwear
                  </p>
                  <p className='flex gap-2' >
                      <input onChange={toggleSubCategory} className='w-3' type="checkbox" value={'Winterwear'} />
                      Winterwear
                  </p>  
              </div>
          </div> 
        </div> 
        <div className='flex-1'>
           <div className='flex justify-between text-base sm:text-2xl mb-4'>
             <Title text1={'ALL'} text2={'COLLECTIONS'} /> 
             <select onChange={(e)=>setsortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                 <option value="Relavent">Sort by:Relavent</option>
                 <option value="Low-high">Sort by:Low-high</option>
                 <option value="High-low">Sort by:High-low</option>
             </select>
           </div>
           <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filteredProducts.map((item,index)=>(
                       <Productitems key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                    ))
                }   
           </div>
        </div>
    </div>
  )
}

export default Collection
