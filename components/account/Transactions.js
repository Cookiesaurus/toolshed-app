"use client";
import DataTable from "react-data-table-component";
const Transactions = ({user, data}) =>{
    const columns = [
        {
          name: "Type",
          selector: (row) => row.type
        },
        {
          name: "Date",
          selector: (row) => row.date,
          sortable: true
        },
        {
          name: "Payment Method",
          selector: (row) => row.method,
          sortable: true
        },
        {
          name: "Amount",
          selector: (row) => row.amount,
          sortable: true
        }
      ];
    return(
    <>
    <h1>Transaction History</h1>
    <DataTable columns={columns} pagination/>
    </>
    )
}

export default Transactions