import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner";
import useAuth from '@/features/auth/hook/useAuth';
import { useSelector } from 'react-redux';

const App = () => {

  const {handleAccessToken} = useAuth()
  const user = useSelector(state => state.auth.user)
  console.log(user)
  useEffect(()=>{
      handleAccessToken()
  }, [])

  return (
    <div className=''>
     <Outlet/>
     <Toaster
       position="top-right"
  
  closeButton
  duration={3000}
      
     />
    </div>
  )
}

export default App
