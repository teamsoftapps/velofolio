import Image from 'next/image'
import React from 'react'

const ManagementView = () => {
  return (
    <div className='w-full items-center text-black text-center'>
        <h1 className='text-3xl sm:text-5xl text-center mb-2'>Experience Our Studio <br /> Management <span className='text-[#01B0E9] leading-tight'> Anywhere</span> </h1>
   <p>Manage clients, jobs, payments, and your team seamlessly on web or mobile.</p>
   <div className='w-full h-[90vh] my-7 bg-[#D7D7D7] rounded-4xl'>
    {/* <Image
        src="/images/videothumbnail.png"
        alt="Picture of the author"
        width={0}
        height={0}
        sizes="90vw"
        className="w-full h-full object-cover"
      /> */}
      <video
        src="/images/video.mp4"
        controls={false}     // Show player controls
        autoPlay      // Start playing automatically
        loop          // Repeat
        muted         // Required if using autoPlay
         className="w-full h-full object-cover rounded-4xl"
      />

   </div>
    </div>
  )
}

export default ManagementView