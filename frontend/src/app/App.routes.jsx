import {createBrowserRouter} from 'react-router-dom'
import App from '../app/App.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import BlankLayout from '../layouts/BlankLayout.jsx'

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
           {
            element : <MainLayout />,
            children : [
                {
                    path: "/dashboard",
                    // element: <Dashboard />
                }
            ]
           }, 
           {
            element : <BlankLayout />,
            children : [
                {
                    path: "/login",
                    // element: <Login />
                }
            ]
           }
           
        ]
    }
])


export default router