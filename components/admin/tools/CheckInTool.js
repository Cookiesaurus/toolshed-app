"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DataTable from "react-data-table-component";
const CheckInTool = ({toolData}) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const columns = [
    {
      name: "Tool",
      selector: (row) => row.tool
    },
    {
      name: "Tool ID",
      selector: (row) => row.toolID,
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
      selector: (row) => row.payment,
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
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true
    }, 
    {
        name: "Action",
        selector: (row) => row.action,
    }
  ];

  const data = toolData.map((tool)=>{
    const action = (
      <div className="actions-links" role="list" aria-label="actions">
        <div className="action" role="listitem">
        <Link
          className="editButton"
          href={{
            pathname: "/admin/inventory/checkin/product",
            query: { tool_id: tool.Tool_ID, account_id: tool.Account_ID, transaction_id: tool.Transaction_ID }
          }}
        >
          Check In
        </Link>
        </div>
      </div>
    );
    const start = new Date(tool.Transaction_Date).toLocaleDateString('en-US', options);
    const end = new Date(tool.End_Date).toLocaleDateString('en-US', options);
    return {
      tool: tool.Tool_Name,
      toolID: tool.Tool_ID,
      status: tool.Transaction_Status,
      details: tool.Transaction_Details,
      payment: tool.Payment_Amount,
      start: start,
      end: end,
      name: tool.Name,
      action: action
    };
  })

  return (
    <>
    <h1>Check In</h1>
    <div className="checkout-container white">
        <div className="white">
        <label htmlFor="find user" className="sr-only">Find User</label>
        <input
            type="text"
            name="find user"
            id="navbar-search"
            aria-label="search products"
            onChange={(e) => {
            router.push(`?` + createQueryString("name", e.target.value));
            }}
            placeholder="Find User"
        />
        <button
            type="submit"
            className="navbar-searchIcon white"
            aria-hidden={true}
            tabIndex={-1}
        >
            <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            style={{ color: "white", backgroundColor: "black" }}
            />
        </button>
        </div>
        <button
            type="submit"
            className="button"
        >
            Create New User
        </button>
    </div>
    <div className="mainContent datatable">
        <DataTable
          columns={columns}
          pagination
          highlightOnHover
          data={data}
        />
    </div>
    </>
  );
};

export default CheckInTool;
