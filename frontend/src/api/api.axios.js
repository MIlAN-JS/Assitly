import axios from "axios"
import store from "../app/store.js"

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
})
// attaching access token 
api.interceptors.request.use((config) => {
  const token = store.getState().auth.user.accessToken

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})


api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const res = await axios.get(
        "/api/auth/get-access-token",
        { withCredentials: true }
      )

      const newAccessToken = res?.data?.user?.accessToken

      store.dispatch({
        type: "auth/setAccessToken",
        payload: newAccessToken,
      })

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`

      return api(originalRequest)
    }

    return Promise.reject(error)
  }
)

export default api