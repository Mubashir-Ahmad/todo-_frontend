import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    isAuthenticated: null,
    loading: false,
    error: '',
    isadded:null,
    users: [''],
}

const userReducer = createReducer(initialState, builder => {
    builder.addCase('login_request', (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase('login_success', (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.users = action.payload;
    });
    builder.addCase('create_user_success', (state, action) => {
        state.loading = false;
        state.isadded = true
        state.users = action.payload;
      });
      builder.addCase('Same_user_exist', (state, action) => {
        console.log('isadded_calledSame')
        state.loading = false;
        state.isAuthenticated = false;
        state.isadded = false;
        state.error = action.payload;
      });
      builder.addCase('login_error', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      });
      builder.addCase('logout', (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.isadded = false;
        state.users = '';
      });
});

export {userReducer}