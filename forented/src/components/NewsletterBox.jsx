import React from 'react'

const NewsletterBox = () => { 

  const submithandler = (event)=>{
     event.preventDefault() 
  }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & Get 20% off</p> 
      <p className='text-gray-400 mt-3'>
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.
      </p> 
      <form onSubmit={submithandler} className='w-ful' >
        <input type="email" placeholder='Enter your email' className='border border-gray-400 px-4 py-2 mt-5 w-64 sm:w-80 focus:outline-none' />
        <button className='bg-black text-white px-6 py-2 ml-3 mt-5 hover:bg-gray-800 transition-all'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox
