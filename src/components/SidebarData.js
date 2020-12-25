import React from 'react';
import * as AiIcons from 'react-icons/ai';


export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Create a reference ',
        path: '/create',
        icon: <AiIcons.AiOutlineVideoCameraAdd />,
        cName: 'nav-text'
    },
    {
        title: 'Manage collections',
        path: '/collections',
        icon: <AiIcons.AiOutlineAppstoreAdd />,
        cName: 'nav-text'
    },
]