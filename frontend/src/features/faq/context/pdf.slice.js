import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    pdf: null, 
    loading : false, 
    error : null,
    success : false
}


const pdfSlice = createSlice({

    name : "faq", 
    initialState,
    reducers : {
        pdfStart : (state , action)=>{
            state.loading = true
            state.error = null
            state.success = false
        }, 
        pdfSuccess : (state , action)=>{
            state.loading = false
            state.error = null
            state.success = true
            state.pdf = action.payload
        }, 
        pdfFailure : (state , action)=>{
            state.loading = false
            state.error = action.payload
            state.success = false
            state.pdf = null
        }, 
        clearError : (state , action)=>{
            state.error = null
        }
    }
})



export const {pdfStart , pdfSuccess , pdfFailure , clearError} = faqSlice.actions
export default pdfSlice.reducer