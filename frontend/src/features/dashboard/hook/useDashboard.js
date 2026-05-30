import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { botSettingsFailure, botSettingsSuccess, dashStart, overviewFailure, overviewSuccess } from "../context/dashboard.slice"
import { getOverviewService, updateWidgetSettingsService } from "../service/dashboard.service"



const useDashboard = () => {
    
    const dispatch = useDispatch()


    const handleGetOverview = async()=>{
        try {
            dispatch(dashStart())
            const response = await getOverviewService()
            dispatch(overviewSuccess(response.overviewData))
            
        } catch (error) {
            dispatch(overviewFailure(error))
            toast.error(error)
        }
    }

    const handleUpdateSettings = async({settings , avatarFile})=>{
        try {
            console.log(avatarFile)
            dispatch(dashStart())
            const response = await updateWidgetSettingsService({settings, avatarFile})
            dispatch(botSettingsSuccess(response.widgetSettings))
        } catch (error) {
            console.log(error.message)
            dispatch(botSettingsFailure(error.message))
            toast.error(error.message)
            
        }
    }

    return {
        handleGetOverview, 
        handleUpdateSettings
    }

}

export default useDashboard