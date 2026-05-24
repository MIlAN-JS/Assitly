import React from 'react'
import { Outlet } from 'react-router-dom'

const BlankLayout = () => {
  console.log("inside bl")
  return (
    <div>

        <Outlet />
      
    </div>
  )
}

export default BlankLayout
