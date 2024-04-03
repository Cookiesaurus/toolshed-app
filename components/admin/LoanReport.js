"use client";
import React from "react";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpFromBracket,  } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { read, utils, writeFile } from 'xlsx';
const LoanReport = ({loanData}) => {
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


  const downloadExcel = (data, fileName) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Sheet1");
    writeFile(wb, `${fileName}.xlsx`);
  };


  function convertJSONtoCSV(jsonData) {
    const separator = ',';
    const keys = Object.keys(jsonData[0]);
  
    // Header row
    let csvContent = keys.join(separator) + '\n';
  
    // Data rows
    jsonData.forEach((row) => {
      const values = keys.map((key) => {
        let cell = row[key];
        if (typeof cell === 'string') {
          // If cell contains comma, escape it with double quotes
          if (cell.includes(',')) {
            cell = `"${cell}"`;
          }
        }
        return cell;
      });
      csvContent += values.join(separator) + '\n';
    });
  
    return csvContent;
  }

  const downloadCSV = () => {
    const csvData = convertJSONtoCSV(jsonData);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || 'data.csv';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };


  return (
    <>
      <div className="reports-header">
        <h1>Loan Reports</h1>
        <div className="download-buttons">
          <button className="downloads" onClick={() => downloadCSV}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> CSV
          </button>
          <button className="downloads" onClick={() => downloadExcel()}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="xs" /> Excel
          </button>
          <button className="downloads">
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

export default LoanReport;
