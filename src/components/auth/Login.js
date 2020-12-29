import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import { changeUser } from '../../features/user/userSlice';
import ErrorNotice from '../misc/ErrorNotice';
function Login() {
    const dispatch = useDispatch();
    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const [error, setError] = useState({
        email: '',
        password: ''
    });
        const submit = async (e) => {
        e.preventDefault();
        setMessage('');
        try{
            const loginUser = { email, password };
            const loginRes = await axios.post(
                '/users/login',
                loginUser
            );

            dispatch(changeUser({
                token: loginRes.data.token,
                user: loginRes.data.user
            }))

            localStorage.setItem('auth-token', loginRes.data.token);
            history.push('/');
        }catch(err){
            
            (err.response.data.errors && setError(err.response.data.errors));
            
        }
    }
    return (
       <div className="page">
            <h2>Log In</h2>
            <form className="form" onSubmit={submit}>
                <span class="error">{message}</span>
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
