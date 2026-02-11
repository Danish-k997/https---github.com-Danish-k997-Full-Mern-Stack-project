import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/frontend_assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t '>
         <Title text1={'ABOUT'} text2={'US'}/>
      </div>  
      <div className=' flex flex-col md:flex-row gap-16'>
        <img className='w-2/6 h-1/3 md:max-w-112.5' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis cupiditate, quod, recusandae quas ipsam velit in perspiciatis similique animi enim placeat dolore omnis totam. Dolor, nostrum omnis illum ipsa molestias architecto recusandae! Molestias, corporis.</p>
           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi repellendus placeat repellat iste numquam qui necessitatibus natus quia dicta quisquam enim, iusto labore tempore porro.</p> 
           <b>Our Mission</b> 
           <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Praesentium est quae sequi ratione dolorem nemo facilis veniam animi, dignissimos, neque voluptate repellat fuga!
           </p>
        </div>
      </div>
           <div className='text-xl py-4'>
             <Title text1={'WHY'} text2={'CHOOSE US'}/>
           </div> 
           <div className='flex flex-col md:flex-row text-sm mb-20'>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Quality Assurance:</b>
               <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatibus.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Quality Assurance:</b>
               <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatibus.</p>
            </div>
            <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
              <b>Quality Assurance:</b>
               <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi, voluptatibus.</p>
            </div>
           </div>
          <NewsletterBox/>
    </div>
  )
}

export default About
