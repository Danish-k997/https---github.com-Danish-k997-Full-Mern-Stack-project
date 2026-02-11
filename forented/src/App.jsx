import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from '../src/page/Home'
import Login from '../src/page/Login'
import Collection from '../src/page/Collection'
import Contact from '../src/page/Contact'
import About from '../src/page/About'
import Product from '../src/page/Product'
import Cart from '../src/page/Cart'
import PlaceOrder from '../src/page/PlaceOrder'
import Orders from '../src/page/Orders'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SearchBar from './components/SearchBar'
import { ToastContainer } from 'react-toastify';
import Verify from './page/Verify'
const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[10vw] lg:px-[15vw] xl:px-[20vw] 2xl:px-[25vw]'>
      <ToastContainer />
      <Navbar/>
      <SearchBar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/collection' element={<Collection/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/product/:productId' element={<Product/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/cart' element={<Cart/>} />
        <Route path='/orders' element={<Orders/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/verify' element={<Verify/>} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
