import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            token: undefined,
            user: undefined  
        },
    },
    reducers: {
      changeUser: (state, action) => {
        state.userData.token = action.payload.token;
        state.userData.user = action.payload.user;
      },
    },
  });


  export const { changeUser } = userSlice.actions;

  export const selectUserData = state => state.user.userData;

  export default userSlice.reducer;