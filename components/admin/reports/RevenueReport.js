"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
const RevenueReport = ({loanData}) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const reportHeader = new Date()
  function RoundToHun(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(2);
    const roundedNum = parseFloat(roundedDecimal);
    return roundedNum;
  }
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: "Payment Amount",
      selector: (row) => row.amount,
      sortable: true
    },
    {
      name: "Transaction Date",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Transaction Type",
      selector: (row) => row.type
    }
  ];

  const tableData = loanData.map((row)=>{
    const date = new Date(row.Transaction_Date).toLocaleDateString('en-US', options);
    const payment = RoundToHun(row.Payment_Amount)
    return {
      name: row.Name,
      email: row.Email,
      amount: payment,
      date: date,
      type: row.Transaction_Details,
    }
  })



  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `Revenue-Report-${reportHeader.toLocaleDateString('en-US', options)}.xlsx`, { compression: true });
  };

  const downlaodPDF = () => {
    const doc = new jsPDF({ orientation: "landscape"})
    doc.text(`Revenue-Report-${reportHeader.toLocaleDateString('en-US', options)}`, 10, 10)
    
    //itereate through the data to make an array 
     const data = loanData.map(obj => [obj.Name, obj.Email, RoundToHun(obj.Payment_Amount), 
      obj.Transaction_Date =  new Date(obj.Transaction_Date).toLocaleDateString('en-US', options), obj.Transaction_Details]);
    
    //create the columns
    const columns = ['Name', 'Email', 'Payment Amount', 'Transaction Date', 'Transaction Type'];
  
    autoTable(doc, {
      head: [columns],
      body: data,
    })
    //name of file
    doc.save(`Revenue-Report-${reportHeader.toLocaleDateString('en-US', options)}.pdf`)
  }



  return (
    <>
      <div className="reports-header">
        <h1>Revenue Report</h1>
        <div className="download-buttons">
          <button className="downloads" onClick={downloadExcel}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> Excel
          </button>
          <button className="downloads" onClick={downlaodPDF}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> PDF
          </button>
        </div>
      </div>
      <div className="mainContent datatable">
        <DataTable columns={columns} data={tableData} pagination/>
      </div>
    </>
  );
};

export default RevenueReport;
