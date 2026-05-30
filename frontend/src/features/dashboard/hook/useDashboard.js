import { useDispatch } from "react-redux"
import { toast } from "sonner"
import { dashStart, overviewFailure, overviewSuccess } from "../context/dashboard.slice"
import { getOverviewService } from "../service/dashboard.service"



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


    return {
        handleGetOverview
    }

}

export default useDashboard