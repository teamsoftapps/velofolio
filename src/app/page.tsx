import React from 'react'
import SignIn from './components/Signin'
import AuthWrapper from './components/AuthWrapper'
const page = () => {
  return (
    <div>
{/* <AuthWrapper guestOnlyRedirectTo="/dashboard"> */}
  <SignIn />
{/* </AuthWrapper> */}

    </div>
  )
}

export default page