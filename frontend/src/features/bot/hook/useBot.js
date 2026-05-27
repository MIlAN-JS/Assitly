import { useDispatch } from "react-redux";
import { botFailure, botStart, botSuccess, clearError } from "../context/bot.slice";
import { toast } from "sonner";
import { createBot , getBot } from "../services/bot.services.js";




const useBot = ()=>{

const dispatch = useDispatch()
    const handleCreateBot = async ({widgetSettings, image, systemPrompt}) => {
        try {

            dispatch(botStart())
          const response = await createBot({widgetSettings, image, systemPrompt});
          console.log(response)
          dispatch(botSuccess(response.bot))
          dispatch(clearError()) //clearError
          
          return response.data;
        } catch (error) {
            console.log(error)
            dispatch(botFailure(error))
            toast.error(error)
        }
      };

      const handleGetBot = async(businessId)=>{
        try {
            dispatch(botStart())
            const bot = await getBot(businessId)
            console.log(bot , "bot fetched")
            dispatch(botSuccess(bot.bot))
            dispatch(clearError())

        } catch (error) {
            console.log(error.response.data.message)
           throw error?.response?.data?.message
           toast.error(error)
        }
      }

      return {
        handleCreateBot, 
        handleGetBot
    }
}



export default useBot
