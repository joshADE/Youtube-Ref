import React from 'react'
import DefaultProfilePhoto from '../assets/profile-photo.jpg'
import { NavLink, Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

const isActive = (path, match, location) => !!(match || path === location.pathname);
function Sidebar({

}) {
    return (
        <nav className="sidebar navbar">
            <Link to="/"><h1 className="title">Youtube Ref</h1></Link>
            
            <ul
                className="menu navbar-nav"
            >
                {SidebarData.map((item, index) => {
                    return (
                        <li key={index} className={`navbar-item ${item.cName}`}>
                            <NavLink exact to={item.path} className="navbar-link" activeClassName="menu-link-current" isActive={isActive.bind(this, item.path)}>
                                {item.icon}
                                <span>{item.title}</span>
                            </NavLink>
                        </li>
                    )
                })}
            </ul>
            <img src={DefaultProfilePhoto} className="profile-photo" alt="profile photo" />
        </nav>
    )
}

export default Sidebar
