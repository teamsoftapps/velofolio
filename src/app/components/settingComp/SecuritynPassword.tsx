import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'
import AccountRecoveryForm from './AccountRecoveryForm'
import TwoFactorAuthCard from './TwoFactorAuthCard'
import ActiveSessionsCard from './ActiveSessionsCard'

const SecuritynPassword = () => {
  return (
    <div className='w-full h-full text-black pb-16'>
         <div className="header w-full my-10 px-5 ">
        

            <h1 className='text-xl'>Security & Password</h1>
            <p className='mt-3 text-md text-[#71717A]'>Customize your studio identity ,client documnets and portal appearance.</p>
            </div>
                <div className="cards pb-3 px-5 w-full flex lg:flex-row flex-col items-center sm:items-start justify-between gap-8  ">
<ChangePasswordForm/>
<AccountRecoveryForm/>

                </div>
                                <div className="cards px-5 w-full flex lg:flex-row items-center flex-wrap md:flex-nowrap justify-center flex-col lg:items-start lg:justify-between gap-2 mt-10 lg:mt-0">
<TwoFactorAuthCard/>
<ActiveSessionsCard/>

                </div>
      
    </div>
  )
}

export default SecuritynPassword
