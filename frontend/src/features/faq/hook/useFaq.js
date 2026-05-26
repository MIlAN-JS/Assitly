import { useDispatch } from "react-redux"
import { clearError, faqStart, faqSuccess , faqFailure } from "../context/faq.slice"
import { toast } from "sonner"
import { pdfFailure, pdfStart, pdfSuccess ,pdfClearError } from "../context/pdf.slice"
import { uploadPdf, createFaq } from "../services/faq.services"



const useFaq = ()=>{

    const dispatch  = useDispatch()

    const handleCreateFaq = async({businessId , faqs})=>{
        try {
            console.log(businessId, faqs)
            dispatch(faqStart())
            const response = await createFaq({businessId , faqs})
            console.log(response)
            dispatch(faqSuccess(response.faqs))
            dispatch(clearError())
            
        } catch (error) {
           dispatch(faqFailure(error))
            // toast.error(error)
            console.log(error)
        }
    }

    const handleCreatePdf = async({businessId , pdf})=>{
        try {
            dispatch(pdfStart())
            const response = await uploadPdf({businessId , pdf})
            dispatch(pdfSuccess(response.pdf))
            dispatch(pdfClearError())
            
        } catch (error) {
           dispatch(pdfFailure(error))
            toast.error(error)
        }
    }
    return{
        handleCreateFaq,
        handleCreatePdf
    }
}


export default useFaq