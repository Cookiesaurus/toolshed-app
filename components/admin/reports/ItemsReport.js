"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
const ItemsReport = ({itemsData}) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const reportHeader = new Date()
  console.log(itemsData)
  const columns = [
    {
      name: "Customer Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Reservation Date",
      selector: (row) => row.date,
      sortable: true
    },
    {
      name: "Tool Name",
      selector: (row) => row.tool,
      sortable: true
    },
    {
      name: "Return Date",
      selector: (row) => row.return,
      sortable: true
    },
    {
      name: "Pick Up Location",
      selector: (row) => row.location
    }
  ];

  const tableData = itemsData.map((row)=>{
     let resDate = new Date (row.Transaction_Date).toLocaleDateString('en-US', options)
     let retDate;
     row.End_Date ? retDate = new Date(row.End_Date).toLocaleDateString('en-US', options) : 'Return Date Not Set'
     let current;
     switch(row.Current_Location){
         case 1:
             current = "Main"
             break;
         case 2:
             current = "Mobile Unit - Thomas P. Ryan Center (Monday)"
             break;
         case 3:
             current = "Mobile Unit - Edgerton Recreation Center (Tuesday)"
             break;
         case 4:
             current = "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)"
             break;
         case 5:
             current = "Mobile Unit - David F. Gantt Reacreation Center (Thursday)"
             break;
     }
    return {
      name: row.Name,
      date: resDate,
      tool: row.Tool_Name,
      return: retDate,
      location: current
    }
  })

  const excelData = itemsData.map((row)=>{
    let resDate = new Date (row.Transaction_Date).toLocaleDateString('en-US', options)
     let retDate;
     row.End_Date ? retDate = new Date(row.End_Date).toLocaleDateString('en-US', options) : 'Return Date Not Set'
     let current;
     switch(row.Current_Location){
         case 1:
             current = "Main"
             break;
         case 2:
             current = "Mobile Unit - Thomas P. Ryan Center (Monday)"
             break;
         case 3:
             current = "Mobile Unit - Edgerton Recreation Center (Tuesday)"
             break;
         case 4:
             current = "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)"
             break;
         case 5:
             current = "Mobile Unit - David F. Gantt Reacreation Center (Thursday)"
             break;
     }
    return {
      Customer_Name: row.Name,
      Reservation_Date: resDate,
      Tool_Name: row.Tool_Name,
      Return_Date: retDate,
      Pickup_Location: current
    }
  })

  const pdfData = itemsData.map((row)=>{
    let resDate = new Date (row.Transaction_Date).toLocaleDateString('en-US', options)
     let retDate;
     row.End_Date ? retDate = new Date(row.End_Date).toLocaleDateString('en-US', options) : 'Return Date Not Set'
     let current;
     switch(row.Current_Location){
         case 1:
             current = "Main"
             break;
         case 2:
             current = "Mobile Unit - Thomas P. Ryan Center (Monday)"
             break;
         case 3:
             current = "Mobile Unit - Edgerton Recreation Center (Tuesday)"
             break;
         case 4:
             current = "Mobile Unit - Willie Walker Lightfoot Recreation Center (Wednesday)"
             break;
         case 5:
             current = "Mobile Unit - David F. Gantt Reacreation Center (Thursday)"
             break;
     }
    return [
      row.Name,
      resDate,
      row.Tool_Name,
      retDate,
      current
    ]
  })

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `Checked-Items-Report-${reportHeader.toLocaleDateString('en-US', options)}.xlsx`, { compression: true });
  };

  const downlaodPDF = () => {
    const doc = new jsPDF({ orientation: "landscape"})
    doc.text(`Checked-Items-Report-${reportHeader.toLocaleDateString('en-US', options)}`, 10, 10)
    
    
    //create the columns
    const columns = ['Customer Name', 'Reservation Date', 'Tool Name', 'Return Date', 'Pickup Location'];
  
    autoTable(doc, {
      head: [columns],
      body: pdfData,
    })
    //name of file
    doc.save(`Checked-Items-Report-${reportHeader.toLocaleDateString('en-US', options)}.pdf`)
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
        <DataTable columns={columns} data={tableData}/>
      </div>
    </>
  );
};

export default ItemsReport;
