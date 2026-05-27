import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    faqs: null, 
    loading : false, 
    error : null,
    success : false
}


const faqSlice = createSlice({

    name : "faq", 
    initialState,
    reducers : {
        faqStart : (state , action)=>{
            state.loading = true
            state.error = null
            state.success = false
        }, 
        faqSuccess : (state , action)=>{
            state.loading = false
            state.error = null
            state.success = true
            state.faqs = action.payload
        }, 
        faqFailure : (state , action)=>{
            state.loading = false
            state.error = action.payload
            state.success = false
            state.faqs = null
        }, 
        clearError : (state , action)=>{
            state.error = null
        }
    }
})



export const {faqStart , faqSuccess , faqFailure , clearError} = faqSlice.actions
export default faqSlice.reducer