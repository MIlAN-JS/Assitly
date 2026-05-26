import useBot from '@/features/bot/hook/useBot'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const {id} = useSelector((state) => state.auth.user)

  const {handleGetBot} = useBot()
  useEffect(()=>{
    handleGetBot(id)
  },[])

 
  const bot = useSelector((state) => state.bot)
 
   console.log("bot is ", bot)


  return (
    <div>
        <h1>Dashboard</h1>

     {
        bot ?<h1>your Analytics</h1>: <Link to={"/create-bot"} >Create bot</Link>  
     }
    
    </div>
  )
}

export default Dashboard
