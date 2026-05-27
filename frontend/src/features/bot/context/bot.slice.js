import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    bot :null, 
    loading : false, 
    error : null,
    isBot : false 
    
}



const botSlice  = createSlice({
    name : "bot", 
    initialState, 
    reducers : {

        //bot fetch start
         botStart :  (state , action)=>{

            state.loading = true 
            state.error = null
            

        },

    //bot fetch success 
        botSuccess : (state , action)=>{
            state.loading = false
            state.bot = action.payload
            state.isBot = true
            state.error = null
        },

        //bot fetch  failure

        botFailure : (state , action)=>{
            state.loading = false
            state.bot = null
            state.isBot = false 
            state.error = action.payload
        },

        // clear Error

        clearError : (state , action)=>{
            state.error = null
        }
    }
})


export const {botStart , botSuccess , botFailure , clearError} = botSlice.actions
export default botSlice.reducer