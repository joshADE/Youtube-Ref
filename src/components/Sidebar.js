import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData';
import ProfileDetails from './auth/ProfileDetails';

const isActive = (path, match, location) => !!(match || path === location.pathname);
function Sidebar({
    setSideBarOpen

}) {
    return (
        <nav className="sidebar navbar" onClick={() => setSideBarOpen(false)}>
            <div className="sidebar-top">
                <AiIcons.AiOutlineClose className="close-menu" />
                <Link to="/"><h1 className="title">Youtube Ref</h1></Link>
            </div>
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

            
            <ProfileDetails />
        </nav>
    )
}

export default Sidebar
