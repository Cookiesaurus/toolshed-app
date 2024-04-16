"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowRestore,
  faUserGroup,
  faListUl,
  faGaugeHigh,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
const AdminSideBar = ({admin}) => {
  const ClickDropdown = ({ options, icon, optionText }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionClick = (option) => {
      setSelectedOption(option);
      setIsOpen(false);
    };

    return (
      <div className="click-dropdown">
        <button onClick={() => setIsOpen(!isOpen)} className="admin-sidebar-button">
          {icon && <FontAwesomeIcon icon={icon} size="xl"/>}   {optionText}
        </button>
        {isOpen && (
          <div className="dropdown-menu">
            {options.map((option, index) => (
              <a
                key={index}
                onClick={() => handleOptionClick(option.text, option.href)}
                href={option.href}
              >
                {option.text}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  const customerOptions = [
    { text: "View All Users", href: "/admin/customers" },
    { text: "Create New User", href: "/admin/customers/createuser" }
  ];

  const inventoryOptions = [
    { text: "View All Items", href: "/admin/inventory" },
    { text: "Add New Item", href: "/admin/inventory/new_item" },
    { text: "Check Out", href: "/admin/inventory/checkout" },
    { text: "Check In", href: "/admin/inventory/checkin" }
  ];

  const volunteerInventoryOptions = [
    { text: "Check Out", href: "/admin/inventory/checkout" },
    { text: "Check In", href: "/admin/inventory/checkin" }
  ]

  const reportOptions = [
    { text: "Loan Report", href: "/admin/reports/loans" },
    { text: "Revenue Report", href: "/admin/reports/revenue" },
    { text: "Checked Items Report", href: "/admin/reports/items" },
    { text: "Maintenance Report", href: "/admin/reports/maintenance" },
    { text: "Inactive Membership Report", href: "/admin/reports/inactivemembership" },
    { text: "Active Membership Report", href: "/admin/reports/activemembership" },
  ];

  return (
    <>
      <h3 className="">Administration</h3>
      <div className="side-list">
        <Link href={"/admin/dashboard"} className="side-list_content">
          <FontAwesomeIcon icon={faGaugeHigh} size="xl"/>
          Dashboard
        </Link>
        <Link href={"/"} className="side-list_content">
          <FontAwesomeIcon icon={faWindowRestore} size="xl"/>
          Public Site
        </Link>
        <ClickDropdown
          options={customerOptions}
          icon={faUserGroup}
          optionText={"Customers"}
        />
        {admin ? 
        <ClickDropdown
          options={inventoryOptions}
          icon={faListUl}
          optionText={"Inventory"}
        /> : 
        <ClickDropdown
          options={volunteerInventoryOptions}
          icon={faListUl}
          optionText={"Inventory"}
        />
        }
        
        { admin ? 
          <ClickDropdown
            options={reportOptions}
            icon={faClipboardList}
            optionText={"Reports"}
          />  
          : 
        <></>}
      </div>
    </>
  );
};

export default AdminSideBar;
