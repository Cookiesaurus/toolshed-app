"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
const ItemsReport = ({loanData}) => {
  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true
    },
    {
      name: "Item(s)",
      selector: (row) => row.items,
      sortable: true
    },
    {
      name: "Location",
      selector: (row) => row.location
    },
    {
      name: "Action",
      selector: (row) => row.action
    }
  ];


  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customerData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, "Presidents.xlsx", { compression: true });
  };

  const downlaodPDF = () => {
    const doc = new jsPDF({ orientation: "landscape"})
    doc.text('Report Header', 10, 10)
    
    //itereate through the data to make an array 
    const data = customerData.map(obj => [obj.Account_ID, obj.Name, obj.Email, obj.Organization, obj.Membership_Title]);
    
    //create the columns
    const columns = ['ID', 'Name', 'Email', 'Organization', 'Membership'];
  
    autoTable(doc, {
      head: [columns],
      body: data,
    })
    //name of file
    doc.save('test.pdf')
  }



  return (
    <>
      <div className="reports-header">
        <h1>Checked Items Reports</h1>
        <div className="download-buttons">
          <button className="downloads" onClick={downloadExcel}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> Excel
          </button>
          <button className="downloads" onClick={downlaodPDF}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> PDF
          </button>
        </div>
      </div>
      <div className="data">
        <DataTable columns={columns} />
      </div>
    </>
  );
};

export default ItemsReport;
