import React from 'react'
import FeaturesGrid from './FeatureGrid'

const Features = () => {
  return (
    <div className='text-black w-full'>
        
        <h1 className='text-3xl sm:text-4xl lg:text-5xl  text-center mx-auto'><span className='text-[var(--primary-color)] '>Powerful Features</span> to Run <br /> Your Studio Smarter</h1>
   <FeaturesGrid />
    </div>
  )
}

export default Features
