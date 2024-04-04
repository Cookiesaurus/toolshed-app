'use client'
import React from 'react'
import { useState, useEffect} from 'react';
import Cards from './cards';
import Membership from './membership';
import Profile from './Profile';
import Transactions from './Transactions';
import Security from './security';
import Giftcards from './giftcards';
import Link from 'next/link';

const Accountnav = () => {
    const tabsTop = ['Profile', 'Security', 'Membership'];
    const tabBottom = ['Saved Cards', 'Transaction Histroy', 'Gift Cards'];
    const [selectedTab, setSelectedTab] = useState('');
    const [activeItem, setActiveItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const [session, setSession] = useState(null);
    useEffect(() => {
      fetch("/api/me", { cache: "no-cache" })
          .then((response) => response.json())
          .then((data) => {
              setSession({
                  user: data.user,
                  isLoggedIn: data.isLoggedIn,
              });
              setLoading(false); 
          });
  }, []);
  

    

    const handleTabClick = (tab) =>{
        setSelectedTab(tab);
    }

    let componentToRender;

    if (!loading && session) {
      if (selectedTab === 'Profile') {
        componentToRender = <Profile user={session} />;
      } else if (selectedTab === 'Security') {
        componentToRender = <Security user={session} />;
      } else if (selectedTab === 'Membership') {
        componentToRender = <Membership user={session}/>;
      } else if (selectedTab === 'Saved Cards') {   
        componentToRender = <Cards user={session}/>;
      } else if (selectedTab === 'Transaction Histroy') {
        componentToRender = <Transactions user={session}/>;
      } else if (selectedTab === 'Gift Cards') {
        componentToRender = <Giftcards/>;
      } else {
        componentToRender = <Profile user={session}/>;
      }
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
