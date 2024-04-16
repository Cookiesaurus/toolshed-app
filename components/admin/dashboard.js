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
const Dashboard = ({ users, inventory, dataTable }) => {
  console.log(dataTable)
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.name
    },
    {
      name: "Tool",
      selector: (row) => row.tool,
      sortable: true
    },
    {
      name: "Transaction Start Date",
      selector: (row) => row.start,
      sortable: true
    },
    {
      name: "Transaction End Date",
      selector: (row) => row.end,
      sortable: true
    },
    {
      name: "Transaction Type",
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: "Transaction Status",
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: "Check In Date",
      selector: (row) => row.check,
      sortable: true
    }
  ];

  const data = dataTable.map((row)=>{
    const start = new Date(row.Transaction_Date).toLocaleDateString('en-US', options);
    let end = '';
    row.End_Date === null ? end = '' : end = new Date(row.End_Date).toLocaleDateString('en-US', options);
    let check = ''; 
    row.Check_In_Date === null ? check = '' : check = new Date(row.Check_In_Date).toLocaleDateString('en-US', options);

    return {
      name: row.Name,
      tool: row.Tool_Name,
      start: start,
      end: end,
      type: row.Transaction_Details,
      status: row.Transaction_Status,
      check: check
    }
  })

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

      <div className="mainContent datatable">
        <h2 className="white">Recent Activities</h2>
        <DataTable columns={columns} className="white" data={data} pagination/>
      </div>
    </>
  );
};

export default Dashboard;
