import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/App.css'
import App from './app/App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './app/App.routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
