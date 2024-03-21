'use client'
import React from 'react'
import { useState} from 'react';
import Dashboard from './dashboard';
import Public_Site from './public_site';
import Create_New_User from './create_new_user';
import All_User from './all_users';
import Inventory from './inventory';
import Reports from './reports';
import Link from 'next/link';

const Adminnav = () => {
    const tabsTop = ['Dashboard', 'Public Site', 'Create New User', 'View All Users', 'Inventory', 'Reports'];
    const [selectedTab, setSelectedTab] = useState('');
    const [activeItem, setActiveItem] = useState(null);

    const handleTabClick = (tab) =>{
        setSelectedTab(tab);
    }

    let componentToRender;

    if (selectedTab === 'Dashboard') {
      componentToRender = <Dashboard />;
    } else if (selectedTab === 'Public Site') {
      window.location.replace("http://localhost:3000/")
    } else if (selectedTab === 'Create New User') {
      componentToRender = <Create_New_User />;
    } else if (selectedTab === 'View All Users') {
      componentToRender = <All_User />;
    } else if (selectedTab === 'Inventory') {
      componentToRender = <Inventory />;
    } else if (selectedTab === 'Reports') {
      componentToRender = <Reports />;
    }else {
      componentToRender = <Dashboard/>;
    }


  return (
    <>
        <div className="left-admin">
            <h3>Administration</h3>
            <ul className='side-list'>
            {tabsTop.map((tab, index)=>(
                <li className={`side-link ${selectedTab === tab ? 'active-tab' : ''}`} 
                key={index}
                id={tab}
                onClick={()=> handleTabClick(tab)}
                onFocus={()=> handleTabClick(tab)}
                tabIndex={0}
                >
                {tab}
                </li>
            ))}
            </ul>
        </div>
        <div className='right-admin'>
        {componentToRender}
        </div>
    </>
  )
}

export default Adminnav