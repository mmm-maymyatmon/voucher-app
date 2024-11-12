import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, Navigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import useCookie from 'react-use-cookie'
import useUserStore from '../stores/useUserStore'

const Layout = () => {
  const [userCookie] = useCookie("user");
  const { user, setUser } = useUserStore();

  useEffect(() => {
    setUser(JSON.parse(userCookie));
  }, []);

  return (
    <main className='flex flex-col min-h-screen p-5 '>
        <Header/>
        <Outlet/>
        <Toaster position='top-right' reverseOrder={false} />
    </main>
  )
}

export default Layout