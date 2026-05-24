import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './app/App.css'
import App from './app/App.jsx'
import { RouterProvider } from 'react-router-dom'
import router from './app/App.routes.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider store={store} >
<RouterProvider router={router} />
    </Provider>
     
  </StrictMode>,
)
