import conversationModel from "../models/conversation.model.js"
import mongoose, { mongo } from "mongoose"

const getTotalConvoService = async(businessId)=>{
    
  const totalConversations =  await conversationModel.countDocuments({ 
  businessId: new mongoose.Types.ObjectId(businessId) 
})



    return totalConversations
    
}

const getTotalVisitorService = async(businessId)=>{

  const convertedBID =  new mongoose.Types.ObjectId(businessId)
    
    const result = await conversationModel.aggregate([
        {
            $match : {businessId :convertedBID }
        }, 
        {
          $group : {
            _id : "visitorId"
          }
        }, 
        {
            $count : "totalUniqueVisitors"
        }
    ])

    console.log(result)

    const totalUniqueVisitor = result[0]?.totalUniqueVisitors || 0

    return totalUniqueVisitor

    
    
}


const getResponseTime = async(businessId)=>{
const convertedBID =  new mongoose.Types.ObjectId(businessId)

    const result = await conversationModel.aggregate([
  {
    $match: {
      businessId : convertedBID,
      responseTime: { $gt: 0 } // ignore empty/invalid values
    }
  },
  {
    $group: {
      _id: null,
      avgResponseTime: { $avg: "$responseTime" }
    }
  }
]);

const avgResponseTime =Number(((result[0]?.avgResponseTime || 0) / 1000).toFixed(2));

return avgResponseTime
}


const getRecentConversations = async(businessId)=>{

    const recentConversations = await conversationModel.find({businessId}).sort({createdAt:1}).limit(5)


    const result = recentConversations.filter((conv)=>{
            return conv.role === "human"
    }).map((conv)=>{
      const time = conv.createdAt.toLocaleTimeString();
        return {
            visitorId : conv.visitorId,
            content : conv.content, 
           time : time
        }
    })

    console.log(result)
    return result
}

export { 
    getTotalConvoService, 
    getTotalVisitorService, 
    getResponseTime, 
    getRecentConversations
}