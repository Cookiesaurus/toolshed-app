"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const AdminSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
  
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
    const handleOptionSelect = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };



  return (
    <>
      <h3>Administration</h3>
      <div className="side-list">
          <Link href={"/admin/dashboard"}>Dashboard</Link>
          <Link href={"/"}>Public Site</Link>
          <Link href={"/admin/customers"}>Customers</Link>
          <Link href={"/admin/inventory"}>Inventory</Link>
          <Link href={"/admin/reports"}>Reports</Link>
      </div>
    </>
  );
};

export default AdminSideBar;
