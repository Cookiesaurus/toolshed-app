'use client'
import React from 'react'
import { useState} from 'react';
import Dashboard from './dashboard';
import Public_Site from './public_site';
import Customers from './customers';
import Inventory from './inventory';
import Reports from './reports';
import Link from 'next/link';

const Accountnav = () => {
    const tabsTop = ['Dashboard', 'Public Site', 'Customers', 'Inventory', 'Reports'];
    const [selectedTab, setSelectedTab] = useState('');
    const [activeItem, setActiveItem] = useState(null);

    const handleTabClick = (tab) =>{
        setSelectedTab(tab);
    }

    let componentToRender;

    if (selectedTab === 'Dashboard') {
      componentToRender = <Dashboard />;
    } else if (selectedTab === 'Public Site') {
      componentToRender = <Public_Site />;
    } else if (selectedTab === 'Customers') {
      componentToRender = <Customers />;
    } else if (selectedTab === 'Inventory') {
      componentToRender = <Inventory />;
    } else if (selectedTab === 'Reports') {
      componentToRender = <Reports />;
    }else {
      componentToRender = <Dashboard/>;
    }


  return (
    <>
        <div className="left-account">
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
        <div className='right-account'>
        {componentToRender}
        </div>
    </>
  )
}

export default Accountnav