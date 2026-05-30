import api from "@/api/api.axios";
import { Form } from "react-router-dom";




const getOverviewService = async()=>{

    try {

        const response = await api.get("/dashboard/get-data")
        return response.data
        
    } catch (error) {

          const message =
         error?.response?.data?.message ||
         error?.message ||
         "Failed to get overview";

      console.log(message);

      throw new Error(message);
        
    }

}

const updateWidgetSettingsService = async({settings , avatarFile})=>{

    try {

        console.log(settings , avatarFile)
        const formData = new FormData();
        formData.append("settings", JSON.stringify(settings))
        if(avatarFile){
            formData.append("botAvatar", avatarFile)
        }
        const response = await api.patch("/bot/update-bot", formData)
        return response.data
        
    } catch (error) {
         const message =
         error?.response?.data?.message ||
         error?.message ||
         "Failed to get overview";

      console.log(message);

      throw new Error(message);
    }

}


export { getOverviewService , updateWidgetSettingsService }