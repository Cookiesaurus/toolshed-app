"use client";
import Link from "next/link";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faSquarePlus,
  faArrowRightToBracket,
  faUserGroup,
  faBox,
  faChartColumn,
  faClockRotateLeft
} from "@fortawesome/free-solid-svg-icons";
const Dashboard = ({ users, inventory }) => {
  const columns = [
    {
      name: "User",
      selector: (row) => row.id
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Due Date",
      selector: (row) => row.location,
      sortable: true
    },
    {
      name: "Item",
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: "Location",
      selector: (row) => row.brand,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => row.status,
      sortable: true
    }
  ];

  return (
    <>
      <div className="topRowButtons">
        <Link className="topRowButton" href={"/admin/customers/createuser"}>
          <FontAwesomeIcon icon={faUserPlus} size="xl" />
          Create User
        </Link>
        <Link className="topRowButton" href={"/admin/inventory/new_item"}>
          <FontAwesomeIcon icon={faSquarePlus} size="xl" />
          Add Item
        </Link>
        <Link className="topRowButton" href={"/admin/inventory/checkin"}>
          <FontAwesomeIcon icon={faArrowRightToBracket} size="xl"/>
          Check In
        </Link>
        <Link className="topRowButton" href={"/admin/inventory/checkout"}>
          <FontAwesomeIcon icon={faArrowRightToBracket} rotation={180} size="xl" />
          Check Out
        </Link>
      </div>

      <div className="topRowStats">
        <div className="container">
          <div className="stat">
            <p className="statsTitle">Total users</p>
            <p className="stat">{users.length}</p>
          </div>
          <div className="white">
            <FontAwesomeIcon icon={faUserGroup} size="xl" style={{backgroundColor: 'transparent'}}/>
          </div>
        </div>
        <div className="container">
          <div className="stat">
            <p className="statsTitle">Total Inventory</p>
            <p className="stat">{inventory.length}</p>
          </div>
          <div className="white">
            <FontAwesomeIcon icon={faBox} size="xl" style={{backgroundColor: 'transparent'}}/>
          </div>
        </div>
        <div className="container">
          <div className="stat">
            <p className="statsTitle">Total Sales</p>
            <p className="stat">$9999</p>
          </div>
          <div className="white">
            <FontAwesomeIcon icon={faChartColumn} size="xl" style={{backgroundColor: 'transparent'}} />
          </div>
        </div>
        <div className="container">
          <div className="stat">
            <p className="statsTitle">Active Loans</p>
            <p className="stat">$9999</p>
          </div>
          <div className="white">
            <FontAwesomeIcon icon={faClockRotateLeft} size="xl" style={{backgroundColor: 'transparent'}}/>
          </div>
        </div>
      </div>

      <div className="mainContent">
        <h2 className="white">Recent Activities</h2>
        <DataTable columns={columns} className="white" />
      </div>
    </>
  );
};

export default Dashboard;
