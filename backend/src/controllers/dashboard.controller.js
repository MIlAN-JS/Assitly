import { getRecentConversations, getResponseTime, getTotalConvoService, getTotalVisitorService } from "../services/dashboard.service.js"


const dashboardDataController =async (req , res, next) => {
    try {

        const businessId = req.user

        const totalConversations = await getTotalConvoService(businessId);
        console.log(totalConversations)

        const totalVisitors = await getTotalVisitorService(businessId)

        const responseTime = await getResponseTime(businessId)

        const recentConversations = await getRecentConversations(businessId)


        
        res.status(200).json({
            message : "dashboard data fetched successfully",
            success : true, 
            dashData : {
                totalConversations, 
                totalVisitors, 
                responseTime, 
                recentConversations
            }

        })

    } catch (error) {

        console.log(error)
        next(error)
        
    }
}


export {
    dashboardDataController
}