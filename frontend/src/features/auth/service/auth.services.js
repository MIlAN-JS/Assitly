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


export {
    registerUserService
}