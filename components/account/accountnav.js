"use client";
import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";

const Accountnav = () => {
  //hold values for urls and appearing text in an array and iterate over those values
  const tabTopText = ["Profile", "Security", "Membership"];
  const tabTopURL = ["profile", "security", "membership"];

  const tabBottomText = ["Saved Cards", "Transaction Histroy", "Gift Cards"];
  const tabBotURL = ["saved-cards", "transaction-history", "giftcard"];

  const [selectedTab, setSelectedTab] = useState("");

  return (
    <>
      <div className="left-account">
        <h3>Account Settings</h3>
        <ul className="side-list">
          {tabTopURL.map((tab, index) => (
            <Link
              className={`side-link ${selectedTab === tab ? "active-tab" : ""}`}
              key={index}
              id={tab}
              tabIndex={0}
              href={`/account/${tab}`}
            >
              {tabTopText[index]}
            </Link>
          ))}
        </ul>
        <h3>Payment</h3>
        <ul className="side-list">
          {tabBotURL.map((tab, index) => (
            <Link
              className={`side-link ${selectedTab === tab ? "active-tab" : ""}`}
              key={index}
              id={tab}
              tabIndex={0}
              href={`/account/${tab}`}
            >
              {tabBottomText[index]}
            </Link>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Accountnav;
