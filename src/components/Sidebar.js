import React from 'react'
import DefaultProfilePhoto from '../assets/profile-photo.jpg'
import { NavLink } from 'react-router-dom';
function Sidebar({

}) {
    return (
        <nav className="sidebar navbar">
            <img src={DefaultProfilePhoto} className="profile-photo" alt="profile photo" />
            <ul
                className="menu navbar-nav"
            >
                <li className="navbar-item">
                    <NavLink to="/" className="navbar-link" activeClassName="menu-link-current">
                        Home
                    </NavLink>
                </li>
                <li className="navbar-item">
                    <NavLink to="/create" className="navbar-link" activeClassName="menu-link-current">
                        Create a video reference
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default Sidebar
