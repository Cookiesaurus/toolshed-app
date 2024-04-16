"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from 'xlsx'
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
const MaintenanceReport = ({toolData}) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  const reportHeader = new Date()
  function RoundToHun(decimal) {
    const roundedDecimal = parseFloat(decimal).toFixed(2);
    const roundedNum = parseFloat(roundedDecimal);
    return roundedNum;
  }
  const columns = [
    {
      name: "Tool ID",
      selector: (row) => row.id,
      sortable: true
    },
    {
      name: "Tool",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true
    },
    {
      name: "Replacement Fee",
      selector: (row) => row.fee,
      sortable: true
    },
    {
      name: "Current Location",
      selector: (row) => row.curloc,
      sortable: true
    },
    {
      name: "In House Location",
      selector: (row) => row.loc
    }
  ];

  const tableData = toolData.map((row)=>{
    return {
      id: row.Tool_ID,
      name: row.Tool_Name,
      brand: row.Brand_Name,
      fee: row.Tool_Replacement_Cost,
      curloc: row.Current_Location,
      loc: row.Location_Code
    }
  })


  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");
    XLSX.writeFile(workbook, `Maintenance-Report-${reportHeader.toLocaleDateString('en-US', options)}.xlsx`, { compression: true });
  };

  const downlaodPDF = () => {
    const doc = new jsPDF({ orientation: "landscape"})
    doc.text(`Maintenance-Report-${reportHeader.toLocaleDateString('en-US', options)}`, 10, 10)
    
    //itereate through the data to make an array 
    const data = toolData.map(obj => [obj.Tool_ID, obj.Tool_Name, obj.Brand_Name, obj.Tool_Replacement_Cost, obj.Current_Location, obj.Location_Code]);
    
    //create the columns
    const columns = ['Tool ID', 'Tool', 'Brand', 'Replacement Fee', 'Current Location', 'In House Location'];
  
    autoTable(doc, {
      head: [columns],
      body: data,
    })
    //name of file
    doc.save(`Maintenance-Report-${reportHeader.toLocaleDateString('en-US', options)}.pdf`)
  }



  return (
    <>
      <div className="reports-header">
        <h1>Maintenance Report</h1>
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

export default MaintenanceReport;
