import {createBrowserRouter} from 'react-router-dom'
import App from '../app/App.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import BlankLayout from '../layouts/BlankLayout.jsx'
import RegisterPage from '../features/auth/ui/pages/RegisterPage.jsx'
import PublicRoute from './PublicRoute.jsx'
import PrivateRoute from './PrivateRoute.jsx'

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
                    element:<PrivateRoute><h1>hello world</h1></PrivateRoute> 
                }
            ]
           }, 
           {
            element : <BlankLayout />,
            children : [
                {
                    path: "/register",
                   element :<PublicRoute><RegisterPage/></PublicRoute> 
                }
            ]
           }
           
        ]
    }
])


export default router