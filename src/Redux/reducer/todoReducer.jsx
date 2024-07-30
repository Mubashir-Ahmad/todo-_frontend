import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    loading: false,
    error: '',
    isadded:null,
    isdelete:null,
    isupdate:null,
    todo: []
}
const todoReducer = createReducer(initialState, builder => {
    builder.addCase('todo_request', (state, action) => {
      state.loading = true;
    });
    builder.addCase('todo_success', (state, action) => {
      state.loading = false;
      state.todo = action.payload;
    });
    builder.addCase('create_todo_success', (state, action) => {
      state.loading = false;
      state.isadded = true;
      state.todo = action.payload;
    });
    builder.addCase('delete_todo_success', (state, action) => {
      state.loading = false;
      state.isdelete = true;
    });
    builder.addCase('update_todo_success', (state, action) => {
      state.loading = false;
      state.isupdate = true;
    });
    builder.addCase('todo_error', (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isadded = null;
        state.isdelete = null;
        state.isupdate = null;
      });
})

export {todoReducer}