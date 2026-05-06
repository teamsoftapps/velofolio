import Link from 'next/link'
import React from 'react'

const Letter = () => {
  return (
    <div className='w-full text-center flex flex-col items-center justify-center bg-[url("/images/letter.png")] bg-cover bg-center h-[50vh] rounded-4xl '>
      
       <h1 className='text-4xl leading-14'>Ready to Simplify <br />Your Studio?</h1>
       <p className='font-regular my-4'>Sign up today and manage your studio like a pro.</p>
         <Link
              href="/signup"
              className="px-4 mt-4 sm:px-6 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90 text-white font-medium py-2 sm:py-3 rounded-full transition-colors text-center"
            >
              Get Started Free
            </Link>
    </div>
  )
}

export default Letter
