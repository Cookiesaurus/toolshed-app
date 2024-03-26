'use client'
import React, { useState, useEffect } from 'react';
import Dashboard from './dashboard';
import Public_Site from './public_site';
import Create_New_User from './create_new_user';
import All_User from './all_users';
import Inventory from './inventory';
import Reports from './reports';
import Link from 'next/link';

const Adminnav = ({ customer, inventory }) => {
    const tabsTop = ['Dashboard', 'Public Site', 'Create New User', 'View All Users', 'Inventory', 'Reports'];
    const [selectedTab, setSelectedTab] = useState(null);
    const [activeItem, setActiveItem] = useState(null);

    useEffect(() => {
        // Check if data is loaded, then set the default tab
        if (customer && inventory) {
            setSelectedTab('Dashboard'); // Set the default tab here
        }
    }, [customer, inventory]);

    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    }

    let componentToRender;

    if (selectedTab === 'Dashboard') {
        componentToRender = <Dashboard users={customer} inventory={inventory} />;
    } else if (selectedTab === 'Public Site') {
        window.location.replace("http://localhost:3000/")
    } else if (selectedTab === 'Create New User') {
        componentToRender = <Create_New_User />;
    } else if (selectedTab === 'View All Users') {
        componentToRender = <All_User customerData={customer} />;
    } else if (selectedTab === 'Inventory') {
        componentToRender = <Inventory inventory={inventory} />;
    } else if (selectedTab === 'Reports') {
        componentToRender = <Reports />;
    } else {
        componentToRender = null; // Render nothing until the data is loaded
    }

    return (
        <>
            {selectedTab && (
                <>
                    <div className="left-admin">
                        <h3>Administration</h3>
                        <ul className='side-list'>
                            {tabsTop.map((tab, index) => (
                                <li className={`side-link ${selectedTab === tab ? 'active-tab' : ''}`}
                                    key={index}
                                    id={tab}
                                    onClick={() => handleTabClick(tab)}
                                    onFocus={() => handleTabClick(tab)}
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
            )}
        </>
    )
}

export default Adminnav
