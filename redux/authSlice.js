import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoggedIn: false,
    token: null,
    userName:null
}

const authSlice = createSlice({
    name: "userAuth",
    initialState,

    reducers: {
        setLogIn: (state, action) => {
            state.token = action.payload
            state.isLoggedIn = true
            state.userName=  ""
        },
        setLogOut: (state) => {
            state.token = null
            state.isLoggedIn = false
            state.userName = null
        }
    }
})

export const { setLogIn, setLogOut } = authSlice.actions;
export const selectToken = (state) => state.userAuth.token;
export const selectLogIn = state => state.userAuth.isLoggedIn;
export const selectUserName = state => state.userAuth.userName;
export default authSlice.reducer