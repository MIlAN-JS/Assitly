import axios from "axios"


const api = axios.create({
    baseURL: "api/auth", 
    withCredentials: true
});




const registerUserService = async ({ businessName, email, password }) => {

  try {
    console.log(businessName)
      const response = await api.post("/register", { businessName, email, password })
    return response.data

  } catch (error) {
    console.log(error.response.data.message)
    throw error?.response?.data?.message
    
  }
    
}
// this api fetches both access token and user data at the same time
const getAccessTokenService = async()=>{

  try {

    const response = await api.get("/get-access-token")
    console.log(response)
    return response.data
    
  } catch (error) {
    console.log(error.response.data.message)
    throw error?.response?.data?.message
  }

}

const loginUserService = async ({ email, password }) => {

  try {
      const response = await api.post("/login", { email, password })
      console.log(response.data.user)
    return response.data

  } catch (error) {
    console.log(error.response.data.message)
    throw error?.response?.data?.message
  }
    
}

const logoutUserService = async (accessToken) =>{
  try {
    console.log(accessToken)
    const response = await api.post("/logout" , {
      accessToken : accessToken
    })
    return response.data
  } catch (error) {
     console.log(error.response.data.message)
    throw error?.response?.data?.message
  
  }
}


export {
    registerUserService, 
    getAccessTokenService, 
    loginUserService, 
    logoutUserService
}