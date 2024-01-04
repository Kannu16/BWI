import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name : "auth",
    initialState : {
        isAuthenticated : false,
        token : null,
        username : null
    },

    reducers: {
        authenticateUser: (state, action) => {
          state.isAuthenticated = true;
          state.token = action.payload.token;
          state.username = action.payload.username;
        },
        logoutUser: (state) => {
          state.isAuthenticated = false;
          state.token = null;
        },
    }
})

export const {authenticateUser, logoutUser} = auth.actions;
export default auth.reducer