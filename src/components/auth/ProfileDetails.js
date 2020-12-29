import React from 'react'
import DefaultProfilePhoto from '../../assets/profile-photo.jpg'
import { useSelector } from 'react-redux';
import { selectUserData } from '../../features/user/userSlice';
function ProfileDetails() {
    const { user } = useSelector(selectUserData);
    return (
        <div className="profile-info">
            <img src={DefaultProfilePhoto} className="profile-photo" alt="profile photo" />
            <div className="profile-details">
                <span className="user-name">{user ? user.firstname + ' ' + user.lastname : 'Guest' }</span>
                <br />
                <span className="user-type">User</span>
            </div>
        </div>
    )
}

export default ProfileDetails
