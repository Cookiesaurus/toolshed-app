"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
const ActiveMembershipReport = ({membershipData}) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const reportHeader = new Date()
  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: "Membership Expiration Date",
      selector: (row) => row.expiration,
      sortable: true
    },
    {
      name: "Membership Level",
      selector: (row) => row.level,
      sortable: true
    },
    {
      name: "Membership Creation Date",
      selector: (row) => row.creation,
      sortable: true
    },
    {
      name: "Organization Name",
      selector: (row) => row.org,
      sortable: true
    },
    {
      name: "Auto Renewal Set",
      selector: (row) => row.renewal
    }
  ];

  const tableData = membershipData.map((row)=>{
    const expiration = new Date(row.Membership_Expiration_Date).toLocaleDateString('en-US', options);
    const creation = new Date(row.Membership_Creation_Date).toLocaleDateString('en-US', options);

    return {
      name: row.Primary_User,
      email: row.Email,
      expiration: expiration,
      level: row.Membership_Title,
      creation: creation,
      org: row.Organization_Name,
      renewal: row.Auto_Renewal_Set
    }
  })

  const excelData = membershipData.map((row)=>{
    const expiration = new Date(row.Membership_Expiration_Date).toLocaleDateString('en-US', options);
    const creation = new Date(row.Membership_Creation_Date).toLocaleDateString('en-US', options);

    return {
      Name: row.Primary_User,
      Email: row.Email,
      Membership_Expiration: expiration,
      Membership_Level: row.Membership_Title,
      Membership_Creation_Date: creation,
      Organization_Name: row.Organization_Name,
      Renewal: row.Auto_Renewal_Set
    }
  })

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `Active-Members-Report-${reportHeader.toLocaleDateString('en-US', options)}.xlsx`, { compression: true });
  };

  const downlaodPDF = () => {
    const doc = new jsPDF({ orientation: "landscape"})
    doc.text(`Active-Members-Report-${reportHeader.toLocaleDateString('en-US', options)}`, 10, 10)
    
    //itereate through the data to make an array 
    const data = membershipData.map(row => [row.Primary_User, row.Email, 
                                row.Membership_Expiration_Date = new Date(row.Membership_Expiration_Date).toLocaleDateString('en-US', options), 
                                row.Membership_Title,
                                row.Membership_Creation_Date = new Date(row.Membership_Creation_Date).toLocaleDateString('en-US', options),
                                row.Organization_Name, row.Auto_Renewal_Set
                              ]);
    
    //create the columns
    const columns = ['Name', 'Email', 'Membership Expiration Date', 'Membership Level', 'Membership Creation Date', 'Organization Name', 'Auto Renewal Set'];
  
    autoTable(doc, {
      head: [columns],
      body: data,
    })
    //name of file
    doc.save(`Active-Members-Report-${reportHeader.toLocaleDateString('en-US', options)}.pdf`)
  }



  return (
    <>
      <div className="reports-header">
        <h1>Active Members Report</h1>
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
        <DataTable columns={columns} data={tableData} pagination defaultSortFieldId={1}/>
      </div>
    </>
  );
};

export default ActiveMembershipReport;
