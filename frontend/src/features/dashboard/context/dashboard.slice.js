import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    overview :null, 
    faqs : null,
    loading : false, 
    botSettings : null,
    error : null,
    
}



const botSlice  = createSlice({
    name : "bot", 
    initialState, 
    reducers : {

        //bot fetch start
         dashStart :  (state , action)=>{

            state.loading = true 
            state.error = null
            

        },

    //bot fetch success 
        overviewSuccess : (state , action)=>{
            state.loading = false
            state.overview = action.payload
         
            state.error = null
        },

        //bot fetch  failure

        overviewFailure : (state , action)=>{
            state.loading = false
            state.overview = null 
            state.error = action.payload
        },

        faqsSucess : (state , action)=>{
            state.loading = false
            state.faqs = action.payload
            state.error = null
        },
        faqsFailure : (state , action)=>{
            state.loading = false
            state.error = action.payload
            state.success = false
            state.faqs = null
        },

        botSettingsSuccess : (state , action)=>{
            state.loading = false
            state.botSettings = action.payload
            state.error = null
        },
        botSettingsFailure : (state , action)=>{
            state.loading = false
            state.error = action.payload
            state.success = false
            state.botSettings = null
        },

        // clear Error

        clearError : (state , action)=>{
            state.error = null
        }


    }
})


export const {dashStart , overviewSuccess , overviewFailure , faqsSucess , faqsFailure , botSettingsSuccess , botSettingsFailure , clearError} = botSlice.actions
export default botSlice.reducer