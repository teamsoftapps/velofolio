import React from 'react'
import SignIn from './components/Signin'
import AuthWrapper from './components/AuthWrapper'
import RouteGuard from './components/RouteGuard'
const page = () => {
  return (
    <RouteGuard>
    <div>
{/* <AuthWrapper guestOnlyRedirectTo="/dashboard"> */}
  <SignIn />
{/* </AuthWrapper> */}

    </div>
    </RouteGuard>
  )
}

export default page