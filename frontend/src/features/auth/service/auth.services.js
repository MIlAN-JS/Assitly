import axios from "axios"


const api = axios.create({
    baseURL: "api/auth", 
    withCredentials: true
});



const registerUserService = async ({ businessName, email, password }) => {

  try {
      const response = await api.post("/register", { businessName, email, password })
    return response.data

  } catch (error) {
    console.log(error)
    throw error
    
  }
    
}


export {
    registerUserService
}