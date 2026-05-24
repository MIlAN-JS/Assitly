import { useDispatch } from "react-redux";
import { authStart , authSuccess , authFailure , logout , clearError } from "../context/auth.slice.js";
import { registerUserService , } from "../service/auth.services.js";


const useAuth = ()=>{

 const dispatch = useDispatch()


   // registerUser
      const handleRegisterUser = async ({ businessName, email, password }) => {

        try {
            dispatch(authStart())
            const response = await registerUserService({ name, email, password })
            console.log(response)
            dispatch(authSuccess(response.user))
  
        } catch (error) {
          console.log(error)
          dispatch(authFailure(error.message))
          
          
        }
      }
     



return {
    handleRegisterUser,
}

}


export default useAuth