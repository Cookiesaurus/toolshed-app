"use client";
import React from "react";
import DataTable from "react-data-table-component";
import Link from "next/link";
const CheckOutTool = ({ currentData, memberships }) => {
  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.name
    },
    {
      name: "Customer ID",
      selector: (row) => row.id
    },
    {
      name: "Tool",
      selector: (row) => row.tool,
      sortable: true
    },
    {
      name: "Tool ID",
      selector: (row) => row.toolid,
      sortable: true
    },
    {
      name: "Transaction Status",
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: "Transaction Details",
      selector: (row) => row.details,
      sortable: true
    },
    {
      name: "Payment Amount",
      selector: (row) => row.Payment_Amount,
      sortable: true
    },
    {
      name: "Transaction Date",
      selector: (row) => row.date,
      sortable: true
    }, 
    {
        name: "Action",
        selector: (row) => row.action,
    }
  ];
  console.log(currentData);
  const data = currentData.map((tData) => {
    const action = (
        <div className="actions-links" role="list" aria-label="actions">
          <div className="action" role="listitem">
          <Link
            className="editButton"
            href={{
              pathname: "/admin/inventory/checkout/product",
              query: { tool_id: tData.Tool_ID, account_id: tData.Account_ID, transaction_id: tData.Transaction_ID }
            }}
          >
            Check Out
          </Link>
          </div>
        </div>
      );
    const date = new Date(tData.Transaction_Date).toString();
    return {
      name: tData.Name,
      id: tData.Account_ID,
      tool: tData.Tool_Name,
      toolid: tData.Tool_ID,
      status: tData.Transaction_Status,
      details: tData.Transaction_Details,
      payment: tData.Payment_Amount,
      date: date,
      action: action
    };
  });
  return (
    <>
      <div className="checkout-header-container">
        <div className="checkout">
          <h1>Check Out</h1>
          <div className="customer-info">
            <label>This will act as a search for the table below</label>
            <input type="text" placeholder="Find User"></input>
            
          </div>
        </div>
      </div>
      <div className="mainContent datatable">
        <DataTable columns={columns} pagination highlightOnHover data={data} />
      </div>
    </>
  );
};

export default CheckOutTool;
