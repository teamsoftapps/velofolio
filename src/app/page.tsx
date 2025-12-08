import React from 'react'
import SignIn from './components/Signin'
import AuthWrapper from './components/AuthWrapper'
import RouteGuard from './components/RouteGuard'
import Homepage from './components/Homepage/Homepage'
const page = () => {
  return (
    <RouteGuard>
    <div>
{/* <AuthWrapper guestOnlyRedirectTo="/dashboard"> */}
  <Homepage/>
{/* </AuthWrapper> */}

    </div>
    </RouteGuard>
  )
}

export default page