"use client";
import DataTable from "react-data-table-component";
const Transactions = ({user, data}) =>{
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

  const datatable = data.map((row)=>{
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
    return(
    <>
    <h1>Transaction History</h1>
    <div className="mainContent datatable">
        <DataTable columns={columns} className="white" data={datatable} pagination/>
      </div>
    </>
    )
}

export default Transactions