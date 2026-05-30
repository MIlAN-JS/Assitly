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
import Dashboard from '@/features/dashboard/ui/Dashboard.jsx'
import CreateBotPage from '@/features/bot/ui/CreateBot.jsx'
import FaqsPage from '@/features/faq/ui/CreateFaq.jsx'
import LandingPage from '@/features/Home/ui/LandingPage.jsx'
import StepEmbed from '@/components/Embed.jsx'
import Docs from '@/components/Docs.jsx'
import PricingPage from '@/features/Home/ui/components/Pricing.jsx'
// import StepEmbed from '@/components/Docs.jsx'

const router = createBrowserRouter([
    {
        path: "",
        element: <App />,
        children: [
           {
            element : <MainLayout />,
            children : [
                {
                    path: "/dashboard",
                    element:<PrivateRoute><Dashboard/></PrivateRoute> 
                },
                 {
                    path: "/", 
                    element : <LandingPage/>

                },
                
                {
                    path: "/create-bot",
                    element:<PrivateRoute><CreateBotPage/></PrivateRoute> 
                }, 
                {
                    path : "/create-faq", 
                    element : <PrivateRoute><FaqsPage/></PrivateRoute>
                }, 
                {
                    path: "/embed", 
                    element :<StepEmbed/>
                }, 
                {
                    path : "/docs", 
                    element : <Docs/>
                }, 
                {
                    path : "/pricing", 
                    element : <PricingPage/>
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