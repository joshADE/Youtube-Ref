import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Spinner } from 'reactstrap';
import { login, selectAllUserData } from '../../features/user/userSlice';
import { selectAllErrorData, clearErrors } from '../../features/error/errorSlice';

import ErrorNotice from '../misc/ErrorNotice';
import AuthOptions from './AuthOptions';
function Login() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { isAuthenticated, isLoading } = useSelector(selectAllUserData);
    const { msg, status, id} = useSelector(selectAllErrorData);

    // demo account
    const [email, setEmail] = useState('test@email.com');
    const [password, setPassword] = useState('123456');
    const [message, setMessage] = useState('');

    const [error, setError] = useState({
        email: '',
        password: ''
    });

    useEffect(() => {
        if(id === 'LOGIN_FAIL'){
           setError(msg.errors); 
        }else{
            setError({
                email: '',
                password: ''
            });
        }
        if(isAuthenticated){
            history.push('/');
        }
        
    },[msg, status, id, isAuthenticated]);

    useEffect(() => {
        return dispatch(clearErrors());
    },[])
        const submit = (e) => {
            e.preventDefault();
            setMessage('');
            
            
            const loginUser = { email, password };
            dispatch(login(loginUser));
        }
    return (
       <div className="page">
            <h2>Log In</h2>
            {isLoading && <Spinner color="secondary" />}
            <form className="form" onSubmit={submit}>
                <span className="error">{message}</span>
                <label htmlFor="login-email">Email</label>
                <input id="login-email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                {error.email && (<ErrorNotice message={error.email} clearError={() => setError({...error, email: undefined})} />)}


                <label htmlFor="login-password">Password</label>
                <input id="login-password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                {error.password && (<ErrorNotice message={error.password} clearError={() => setError({...error, password: undefined})} />)}

                <input type="submit" value="Log in" />

                
            </form>
        </div>
    )
}

export default Login
