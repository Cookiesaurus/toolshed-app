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
const AdminSideBar = () => {
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

  const reportOptions = [
    { text: "Loan Report", href: "/admin/reports/loans" },
    { text: "Revenue Report", href: "/admin/reports/revenue" },
    { text: "Checked Items Report", href: "/admin/reports/items" },
    { text: "Maintenance Report", href: "/admin/reports/maintenance" },
    { text: "Membership Report", href: "/admin/reports/membership" }
  ];

  return (
    <>
      <h3>Administration</h3>
      <div className="side-list">
        <Link href={"/admin/dashboard"}>
          <FontAwesomeIcon icon={faGaugeHigh} size="xl"/>
          Dashboard
        </Link>
        <Link href={"/"}>
          <FontAwesomeIcon icon={faWindowRestore} size="xl"/>
          Public Site
        </Link>
        <ClickDropdown
          options={customerOptions}
          icon={faUserGroup}
          optionText={"Customers"}
        />
        <ClickDropdown
          options={inventoryOptions}
          icon={faListUl}
          optionText={"Inventory"}
        />
        <ClickDropdown
          options={reportOptions}
          icon={faClipboardList}
          optionText={"Reports"}
        />
      </div>
    </>
  );
};

export default AdminSideBar;
