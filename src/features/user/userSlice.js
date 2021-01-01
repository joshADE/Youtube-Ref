import { createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { getErrors, clearErrors } from '../error/errorSlice';
function loggedIn (state, { payload }){
  localStorage.setItem('auth-token', payload.token)
  //state = {...state, ...payload};
  state.token = payload.token;
  state.isAuthenticated = true;
  state.isLoading = false;
  state.user = payload.user;
}

function loggedOut (state){
  localStorage.removeItem('auth-token');
  state.token = null;
  state.user = null;
  state.isAuthenticated = false;
  state.isLoading = false;
}


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: {
            token: undefined,
            user: undefined  
        },
        isAuthenticated: null,
        isLoading: false,
        user: null,
        token: localStorage.getItem('auth-token')
    },
    reducers: {
      changeUser: (state, { payload }) => {
        state.userData.token = payload.token;
        state.userData.user = payload.user;
      },
      userLoading: state => {
        state.isLoading = true;
      },
      userLoaded: (state, { payload }) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = payload;
      },
      loginSuccess: loggedIn,
      registerSuccess: loggedIn,
      authError: loggedOut,
      loginFail: loggedOut,
      logoutSuccess: loggedOut,
      registerFail: loggedOut
    },
  });


  export const {  userLoading, userLoaded, loginSuccess, registerSuccess, authError, loginFail, logoutSuccess, registerFail } = userSlice.actions;

  export const getTokenFromUserReducer = getState => getState().user.token; 

  const headers = (token) => ({
    headers: {"x-auth-token": token }
  })

  export const loadUser = () => async (dispatch, getState) => {
    try{
      dispatch(userLoading());

      const token = getTokenFromUserReducer(getState);

      const userRes = await axios.get(
        '/users/', 
        headers(token)
      );
      dispatch(userLoaded(userRes.data));


    }catch(err){
      console.log(err);
      if(err.response){
        dispatch(getErrors({
          msg: err.response.data,
          status: err.response.status,
          id: null
        }));
      }
      dispatch(authError());
    }
  }

  export const register = (newUser) => async dispatch => {
    try{
      
      const registerRes = await axios.post(
        '/users/register',
        newUser
      );

      const loginRes = await axios.post(
        '/users/login',
        {
          email: newUser.email,
          password: newUser.password,
        }
      );

      dispatch(registerSuccess(loginRes.data));
    }catch(err){
      console.log(err);
      if(err.response){
        dispatch(getErrors({
          msg: err.response.data,
          status: err.response.status,
          id: 'REGISTER_FAIL'
        }));
      }
      dispatch(registerFail());
    }
  }

  export const login = returningUser => async dispatch => {
    try{
      
      const loginRes = await axios.post(
        '/users/login',
        {
          email: returningUser.email,
          password: returningUser.password,
        }
      );

      dispatch(loginSuccess(loginRes.data));
    }catch(err){
      console.log(err);
      if(err.response){
        dispatch(getErrors({
          msg: err.response.data,
          status: err.response.status,
          id: 'LOGIN_FAIL'
        }));
      }
      dispatch(loginFail());
    }
  }

  export const selectAllUserData = state => state.user;

  export default userSlice.reducer;