import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { selectUserData, changeUser } from '../../features/user/userSlice';

function AuthOptions({
}) {
    const userData = useSelector(selectUserData);
    const dispatch = useDispatch();
    const history = useHistory();

    const logout = () => {
        dispatch(changeUser({token: undefined, user: undefined}));
        localStorage.setItem('auth-token', '');
    }
    return (
        <nav className="auth-options">
            {userData.user ? (
                <button onClick={logout}><AiIcons.AiOutlineLogout />Log out</button>
                ) : (
                    <>
                    <button onClick={() => history.push('/register')}><AiIcons.AiOutlineUserAdd />Register</button>
                    <button onClick={() => history.push('/login')}><AiIcons.AiOutlineLogin />Log in</button>
                    </>
                )

            }
        </nav>
    )
}

export default AuthOptions
