import { useDispatch, useSelector } from "react-redux";
import { botFailure, botStart, botSuccess, clearError } from "../context/bot.slice";
import { toast } from "sonner";
import { createBot , getBot } from "../services/bot.services.js";




const useBot = ()=>{
    const loading = useSelector(state => state.bot.loading)
    const error = useSelector(state => state.bot.error)
    console.log(error)

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
          console.error(error);
   dispatch(botFailure(error.message));

   toast.error(error.message);
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
             console.error(error);
   dispatch(botFailure(error.message));

   toast.error(error.message);

        } 
      }

      return {
        handleCreateBot, 
        handleGetBot
    }
}



export default useBot
