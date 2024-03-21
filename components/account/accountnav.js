'use client'
import React from 'react'
import { useState} from 'react';
import Cards from './cards';
import Membership from './membership';
import Profile from './Profile';
import Transactions from './Transactions';
import Security from './security';
import Giftcards from './giftcards';
import Link from 'next/link';
import '../../app/giftcard/giftcard.css'

const Accountnav = () => {
    const tabsTop = ['Profile', 'Security', 'Membership'];
    const tabBottom = ['Saved Cards', 'Transaction Histroy', 'Gift Cards'];
    const [selectedTab, setSelectedTab] = useState('');
    const [activeItem, setActiveItem] = useState(null);

    const handleTabClick = (tab) =>{
        setSelectedTab(tab);
    }

    let componentToRender;

    if (selectedTab === 'Profile') {
      componentToRender = <Profile />;
    } else if (selectedTab === 'Security') {
      componentToRender = <Security />;
    } else if (selectedTab === 'Membership') {
      componentToRender = <Membership />;
    } else if (selectedTab === 'Saved Cards') {   
      componentToRender = <Cards />;
    } else if (selectedTab === 'Transaction Histroy') {
      componentToRender = <Transactions />;
    } else if (selectedTab === 'Gift Cards') {
      componentToRender = <Giftcards/>;
    } else {
      componentToRender = <Profile/>;
    }


  return (
    <>
        <div className="left-account">
            <h3>Account Settings</h3>
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
            <h3>Payment</h3>
            <ul className='side-list'>
            {tabBottom.map((tab, index)=>(
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
