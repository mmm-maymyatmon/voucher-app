import React from 'react'
import Header from './Header'
import { Outlet, Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import useCookie from 'react-use-cookie'

const Layout = () => {
  const [token] = useCookie("my_token");

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <main className='flex flex-col min-h-screen p-5 '>
        <Header/>
        <Outlet/>
        <Toaster position='top-right' reverseOrder={false} />
    </main>
  )
}

export default Layout