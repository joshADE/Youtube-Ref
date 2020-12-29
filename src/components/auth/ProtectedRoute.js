import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user } = useSelector(selectUserData);
    return (
    <Route {...rest} render={(props) => (
       user ? 
          <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location }}} />   
    )} />
)};

export default ProtectedRoute