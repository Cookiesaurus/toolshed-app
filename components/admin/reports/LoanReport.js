"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'

const LoanReport = ({loanData}) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const reportHeader = new Date()
  function RoundToHun(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(2);
    const roundedNum = parseFloat(roundedDecimal);
    return roundedNum;
  }
  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Tool",
      selector: (row) => row.tool,
      sortable: true
    },
    {
      name: "Transaction Date",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Transaction Type",
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: "Payment Amount",
      selector: (row) => row.amount
    },
    {
      name: "Check In Date",
      selector: (row) => row.start
    },
    {
      name: "Check Out Date",
      selector: (row) => row.end
    }
  ];

  const tableData = loanData.map((row)=>{
    const date = new Date(row.Transaction_Date).toLocaleDateString('en-US', options);
    const payment = RoundToHun(row.Payment_Amount)
    let start;
    let end;
    row.Check_In_Date ? start = new Date(row.Check_In_Date).toLocaleDateString('en-US', options) : '',
    row.End_Date ? end = new Date(row.End_Date).toLocaleDateString('en-US', options) : ''
    return {
      name: row.Name,
      tool: row.Tool_Name,
      date: date,
      type: row.Transaction_Details,
      amount: payment,
      start: start,
      end: end
    }
    
  })

  const excelData = loanData.map((row)=>{
    const date = new Date(row.Transaction_Date).toLocaleDateString('en-US', options);
    const payment = RoundToHun(row.Payment_Amount)
    let start;
    let end;
    row.Check_In_Date ? start = new Date(row.Check_In_Date).toLocaleDateString('en-US', options) : '',
    row.End_Date ? end = new Date(row.End_Date).toLocaleDateString('en-US', options) : ''
    return {
      Customer_Name: row.Name,
      Tool_Name: row.Tool_Name,
      Transaction_Date: date,
      Transaction_Type: row.Transaction_Details,
      Payment_Amount: payment,
      Check_In_Date: start,
      Check_Out_Date: end
    }
    
  })

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `Loan-Report-${reportHeader.toLocaleDateString('en-US', options)}.xlsx`, { compression: true });
  };

  const downlaodPDF = () => {
    const doc = new jsPDF({ orientation: "landscape"})
    doc.text(`Loan-Report-${reportHeader.toLocaleDateString('en-US', options)}`, 10, 10)
    
    //itereate through the data to make an array 
    const data = loanData.map(row => {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return [
          row.Name,
          row.Tool_Name,
          new Date(row.Transaction_Date).toLocaleDateString('en-US', options),
          row.Transaction_Details,
          RoundToHun(row.Payment_Amount),
          row.Check_In_Date ? new Date(row.Check_In_Date).toLocaleDateString('en-US', options) : '',
          row.End_Date ? new Date(row.End_Date).toLocaleDateString('en-US', options) : ''
      ];
  });
  
    
    //create the columns
    const columns = ['Customer Name', 'Tool Name', 'Transaction Date', 'Transaction Type', 'Payment Amount', 'Check In Date', 'Check Out Date'];
  
    autoTable(doc, {
      head: [columns],
      body: data,
    })
    //name of file
    doc.save(`Loan-Report-${reportHeader.toLocaleDateString('en-US', options)}.pdf`)
  }


  return (
    <>
      <div className="reports-header">
        <h1>Loan Reports</h1>
        <div className="download-buttons">
          <button className="downloads" onClick={downloadExcel}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> Excel
          </button>
          <button className="downloads" onClick={downlaodPDF}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> PDF
          </button>
        </div>
      </div>
      <div className="datatable mainContent">
        <DataTable columns={columns} data={tableData} pagination/>
      </div>
    </>
  );
};

export default LoanReport;
