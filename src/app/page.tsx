import React from 'react'
import SignIn from './components/Signin'
import AuthWrapper from './components/AuthWrapper'
import RouteGuard from './components/RouteGuard'
import Homepage from './components/Homepage/Homepage'
const page = () => {
  return (
    // <RouteGuard>

    <div><SignIn /></div>

    // </RouteGuard>
  )
}

export default page