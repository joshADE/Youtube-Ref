import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from '../../axios';
import { changeUser } from '../../features/user/userSlice';
import ErrorNotice from '../misc/ErrorNotice';
function Register() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [username, setUserName] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        username: ''
    });
    const submit = async (e) => {
        e.preventDefault();
        setMessage('');

        if (password !== passwordConfirm){
            setMessage('Passwords do not match');
            return;
        }
        try{
            const newUser = { email, password, firstname, lastname, username};
            const registerRes = await axios.post(
                '/users/register',
                newUser
            );

            const loginRes = await axios.post(
                '/users/login',
                {
                    email,
                    password,
                }
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
            <h2>Register</h2>
            <form className="form" onSubmit={submit}>
                {message && (<ErrorNotice message={message} clearError={() => setMessage(undefined)} />)}
                <label htmlFor="register-email">Email</label>
                <input id="register-email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                {error.email && (<ErrorNotice message={error.email} clearError={() => setError({...error, email: undefined})} />)}

                <label htmlFor="register-password">Password</label>
                <input id="register-password" type="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <input type="password" placeholder="Reenter password" onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} />
                {error.password && (<ErrorNotice message={error.password} clearError={() => setError({...error, password: undefined})} />)}

                <label htmlFor="register-firstname">First Name</label>
                <input id="register-firstname" type="text" onChange={(e) => setFirstName(e.target.value)} value={firstname} />
                {error.firstname && (<ErrorNotice message={error.firstname} clearError={() => setError({...error, firstname: undefined})} />)}

                <label htmlFor="register-lastname">Last Name</label>
                <input id="register-lastname" type="text" onChange={(e) => setLastName(e.target.value)} value={lastname} />
                {error.lastname && (<ErrorNotice message={error.lastname} clearError={() => setError({...error, lastname: undefined})} />)}

                <label htmlFor="register-username">Username</label>
                <input id="register-username" type="text" onChange={(e) => setUserName(e.target.value)} value={username} />
                {error.username && (<ErrorNotice message={error.username} clearError={() => setError({...error, username: undefined})} />)}

                <input type="submit" value="Register" />

                
            </form>
        </div>
    )
}

export default Register
