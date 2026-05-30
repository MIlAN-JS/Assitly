import api from "@/api/api.axios";




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


export { getOverviewService }