import React from 'react'
import DefaultProfilePhoto from '../assets/profile-photo.jpg'
import { NavLink } from 'react-router-dom';
import { SidebarData } from './SidebarData';
function Sidebar({

}) {
    return (
        <nav className="sidebar navbar">
            <img src={DefaultProfilePhoto} className="profile-photo" alt="profile photo" />
            <ul
                className="menu navbar-nav"
            >
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={`navbar-item ${item.cName}`}>
                            <NavLink to={item.path} className="navbar-link" activeClassName="menu-link-current">
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Sidebar
