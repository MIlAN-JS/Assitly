import {createBrowserRouter} from 'react-router-dom'
import App from '../app/App.jsx'
import MainLayout from '../layouts/MainLayout.jsx'
import BlankLayout from '../layouts/BlankLayout.jsx'
import RegisterPage from '../features/auth/ui/pages/RegisterPage.jsx'

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
                    element: <h1>hello world</h1>
                }
            ]
           }, 
           {
            element : <BlankLayout />,
            children : [
                {
                    path: "/register",
                   element : <RegisterPage/>
                }
            ]
           }
           
        ]
    }
])


export default router