import React, { useContext} from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/frontend_assets/assets'



const SearchBar = () => {
  
  const {search,setSearch,showSearch,setshowSearch} = useContext(ShopContext) 
  
  return showSearch  ? (
    <div className='border-t border-b bg-gray-50 text-center'>
      <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm' placeholder='Search' type="text" /> 
        <img className='w-4' src={assets.search_icon} alt="search"/> 
      </div> 
      <img onClick={() => setshowSearch(false)} className='inline w-3 cursor-pointer' src={assets.cross_icon} alt="cross"  />  
    </div>
  ) :null
}

export default SearchBar
