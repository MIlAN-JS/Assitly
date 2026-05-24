import React from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from "@/components/ui/sonner";

const App = () => {
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
