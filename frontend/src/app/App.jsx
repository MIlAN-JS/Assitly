import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner";
import useAuth from '@/features/auth/hook/useAuth';
import { useSelector } from 'react-redux';
import useBot from '@/features/bot/hook/useBot';

const App = () => {

  const {handleAccessToken} = useAuth() 
  const {handleGetBot}  = useBot()
  const user = useSelector(state => state.auth.user)
  const bot = useSelector(state => state.bot.bot)
const loading = useSelector(state => state.bot.loading)

  
  useEffect(()=>{
      handleAccessToken()
    

  }, [])

  useEffect(()=>{
    if(!user?.id) return
    handleGetBot(user?.id)
  },[user])

  return (
    <div className=' overflow-x-visible'>
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
