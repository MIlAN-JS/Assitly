
import api from "../../../api/api.axios.js"

const createFaq = async(faqs)=>{
    try {

        const response =await api.post("/faq/create-faq", faqs);
        return response.data
        
    } catch (error) {

        console.log(error)
        throw error?.response?.data?.message
        
    }
}



const  uploadPdf = async (pdf)=>{
    try {

        const response = await api.post("/pdf/upload-pdf", pdf);
        return response.data
        
    } catch (error) {
        
        console.log(error)
        throw error?.response?.data?.message
        
    }
}