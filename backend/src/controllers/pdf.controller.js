import { queryPinecone, uploadPdfService } from "../services/vector.service.js"


const pdfUploadController = async(req , res , next)=>{
    try {

        const botId = req.params.botId
        const businessId = req.user
        const questionPdf = req.file
        console.log(questionPdf)
        //todo : a service to upload pdf to pinecone  
 

        const result = await uploadPdfService({pdf : questionPdf.path , businessId})
       

        if (!result) {
            return res.status(400).json({
                message : "cannot upload pdf",
                success : false
            })
        }

       
        res.status(201).json({
            message : "pdf uploaded successfully",
            success : true,
          
        })
        
    } catch (error) {
        console.log("cannot upload pdf", error)
        next(error)
        
    }
}


export {
    pdfUploadController
}