import React from 'react'
import { Outlet } from 'react-router-dom'

const BlankLayout = () => {
  console.log("inside bl")
  return (
    <div>
<h1>bl</h1>
        <Outlet />
      
    </div>
  )
}

export default BlankLayout
