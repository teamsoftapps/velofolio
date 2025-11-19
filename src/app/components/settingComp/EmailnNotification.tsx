import React from 'react'
import EmailSetting from './EmailSetting'
import Notification from './Notification'
import EmailTemplates from './EmailTemplates'

const EmailnNotification = () => {
  return (
    <div>
    <div className='text-black flex gap-6 flex-col lg:flex-row lg:gap-20 '>
        <div className='lg:mt-16 lg:w-1/2'>
            <EmailSetting />
        </div>
          <div className='lg:mt-16'>
            <Notification/>
          </div>
    </div>
    <EmailTemplates />
    </div>
  )
}

export default EmailnNotification