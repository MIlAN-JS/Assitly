import { useDispatch } from "react-redux";
import { authStart , authSuccess , authFailure , logout , clearError } from "../context/auth.slice.js";
import { registerUserService , } from "../service/auth.services.js";
import {toast} from "sonner"

const useAuth = ()=>{

 const dispatch = useDispatch()


   // registerUser
      const handleRegisterUser = async ({ businessName, email, password }) => {

        try {
            dispatch(authStart())
            const response = await registerUserService({ businessName, email, password })
            console.log(response)
            dispatch(authSuccess(response.user))
            toast.success("Register success !! please verify you email ")
           
        } catch (error) {
          console.log("error is ", error)
          dispatch(authFailure(error))
          toast.error(error)
        }
      }

      const handleGoogleLogin = () => {
        window.location.href = "/api/auth/google";
      };

      const handleGithubLogin = () => {
  window.location.href = "/api/auth/github";
};


     



return {
    handleRegisterUser,
    handleGithubLogin,
    handleGoogleLogin
}

}


export default useAuth