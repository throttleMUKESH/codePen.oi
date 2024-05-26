import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface appSliceState {
   currentUser: {
    success?: boolean
    username?: string,
    picture?: string,
    email?: string,
    savedCodes?: string[]
   }
   isLoggedIn?: boolean
}

const initialState: appSliceState = {
   currentUser: {},
   isLoggedIn: false
}

 const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        updateCurrentUser: (state, action: PayloadAction<appSliceState["currentUser"]>) => {
            state.currentUser = action.payload;
        },
        updateisLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        },
    }
})

export default appSlice.reducer;
export const {updateCurrentUser, updateisLoggedIn} = appSlice.actions;