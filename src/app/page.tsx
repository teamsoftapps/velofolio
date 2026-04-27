import React from 'react'
import SignIn from './components/forms/Signin'
import AuthWrapper from './components/layouts/AuthWrapper'
import RouteGuard from './components/layouts/RouteGuard'
import Homepage from './components/Homepage/Homepage'
const page = () => {
  return (
    <RouteGuard>

      <div><SignIn /></div>

    </RouteGuard>
  )
}

export default page

