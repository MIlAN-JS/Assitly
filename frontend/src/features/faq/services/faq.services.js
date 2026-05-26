
import api from "../../../api/api.axios.js"

const createFaq = async({faqs , businessId})=>{
    try {

        const response =await api.post(`/faq/create-faq`, faqs);
        return response.data
        
    } catch (error) {

        console.log(error)
        throw error?.response?.data?.message
        
    }
}



const  uploadPdf = async ({ pdf , businessId})=>{
    try {
        const formData = new FormData();
        formData.append("pdf", pdf);
        const response = await api.post(`/pdf/upload-pdf`, formData);
        return response.data
        
    } catch (error) {
        
        console.log(error)
        throw error?.response?.data?.message
        
    }
}


export {
    uploadPdf , createFaq
}