import {createBrowserRouter} from 'react-router-dom'
import App from '../app/App.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import BlankLayout from '../layouts/BlankLayout.jsx'
import RegisterPage from '../features/auth/ui/pages/RegisterPage.jsx'
import PublicRoute from './PublicRoute.jsx'
import PrivateRoute from './PrivateRoute.jsx'
import LoginPage from '@/features/auth/ui/pages/LoginPage.jsx'
import VerifyEmail from '@/features/auth/ui/pages/EmailVerifyPage.jsx'
import ResetPassword from '@/features/auth/ui/pages/ResetPassword.jsx'
import ForgotPassword from '@/features/auth/ui/pages/ForgotPassword.jsx'

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
                }, 
                {
                    path: "/login", 
                    element: <PublicRoute><LoginPage/></PublicRoute>
                }, 
                {
                    path : "/verify-email", 
                    element: <PublicRoute><VerifyEmail/></PublicRoute>
                }, 
                {
                    path : "/reset-password", 
                    element: <PublicRoute><ResetPassword/></PublicRoute>
                }, 
                {
                    path : "/forgot-password", 
                    element: <PublicRoute><ForgotPassword/></PublicRoute>
                }, 
               
            ]
           }
           
        ]
    }
])


export default router