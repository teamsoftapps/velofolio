import React from 'react';

const RightHeaderCard = () => {
  const [isSubscription, setIsSubscription] = React.useState(true);
  return (
    <div className='rightcard p-4 sm:p-6 rounded-2xl border border-[#D4D4D8] w-full lg:w-1/2 h-auto lg:h-44 flex flex-col justify-between gap-4'>
      
      {/* Billing Info Labels */}
      <div className='w-full text-[#818181] flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0'>
        <p>Next Billing Date</p>
        <p>Last Payment</p>
      </div>

      {/* Billing Info Values */}
      <div className='w-full text-black flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-0'>
        <p>Nov 28, 2025</p>
        <p>
          <span>Nov 1, 2025 </span>– $<span>49</span> via <span>Visa ***3258</span>
        </p>
      </div>

      {/* Next Payment & Action */}
      <div className='w-full flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2'>
        <div>
          <p className='text-sm sm:text-base text-[#818181]'>Next Payment</p>
          <p className='text-xl sm:text-2xl font-bold'>$49.00</p>
        </div>
       <button
  onClick={() => setIsSubscription(!isSubscription)}
  className={`
    p-2 px-4 rounded-full text-sm sm:text-base whitespace-nowrap cursor-pointer 
    transition-all ease-in-out duration-300 font-medium
    flex items-center justify-center
    ${
      isSubscription
        ? 'bg-black text-white hover:bg-black/80'           // Active: solid black
        : 'bg-black/20 text-white/50 cursor-not-allowed'     // Disabled feel: faded black
    }
  `}
>
 {isSubscription ? 'Cancel Subscription' : 'Resume Subscription'}
</button>
      </div>

    </div>
  );
};

export default RightHeaderCard;
