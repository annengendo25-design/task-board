import { createSlice } from "@reduxjs/toolkit";
const authSlice=createSlice({
    name:'auth',
    initialState:{user:null},
    reducers:{
        logIn(state,action){
            state.user=action.payload
        },
        logOut(state){
            state.user=null
        },
    },
})
export const {logIn,logOut}=authSlice.actions
export default authSlice.reducer