import { createSlice } from '@reduxjs/toolkit';


export const errorSlice = createSlice({
    name: 'error',
    initialState: {
        msg: {},
        status: null,
        id: null
    },
    reducers: {
      getErrors: (state, { payload }) => {
        state.msg = payload.msg;
        state.status = payload.status;
        state.id = payload.id;
      },
      clearErrors: state => {
          state.msg = {};
          state.status = null;
          state.id = null;
      }
    },
  });


  export const { getErrors, clearErrors } = errorSlice.actions;


    export const selectAllErrorData = state => state.error;
  

  export default errorSlice.reducer;