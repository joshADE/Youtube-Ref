import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai';
import { selectAllUserData } from '../../features/user/userSlice';
import { logoutSuccess } from '../../features/user/userSlice';
function AuthOptions({
}) {
    const userData = useSelector(selectAllUserData);
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = () => {
        dispatch(logoutSuccess());
        
    }
    return (
        <nav className="auth-options">
            {userData.user ? (
                <button onClick={logoutUser}><AiIcons.AiOutlineLogout />Log out</button>
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
