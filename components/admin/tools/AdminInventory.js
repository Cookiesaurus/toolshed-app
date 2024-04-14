"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faCartShopping,
  faHandHolding
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";

const AdminInventory = ({ inventory }) => {
  console.log(inventory)
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Home Location",
      selector: (row) => row.homeLoc,
      sortable: true
    },
    {
      name: "Current Location",
      selector: (row) => row.curLoc,
      sortable: true
    },
    {
      name: "Type",
      selector: (row) => row.type,
      sortable: true
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true
    },
    {
      name: "Actions",
      selector: (row) => row.action
    }
  ];

  const data = inventory.map((item) => {
    const action = (
      <div className="actions-links" role="list" aria-label="actions">
        <div className="action" role="listitem">
        <Link
          className="editButton"
          href={{
            pathname: "/admin/inventory/edit",
            query: { tool_id: item.Tool_ID }
          }}
        >
          <FontAwesomeIcon
            icon={faPencil}
            color="white"
            style={{ backgroundColor: "transparent" }}
          />
          Edit
        </Link>
        </div>
        <div className="action" role="listitem">
        <Link
          className="checkoutButton"
          href={{
            pathname: "/admin/inventory/checkout",
            query: { tool_id: item.Tool_ID }
          }}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            color="white"
            style={{ backgroundColor: "transparent" }}
          />
          Checkout
        </Link>
        </div>
      </div>
    );
    return {
      id: item.Tool_ID,
      name: item.Tool_Name,
      homeLoc: item.Home_Location,
      curLoc: item.Current_Location,
      type: item.Types,
      brand: item.Brand_Name,
      status: item.Tool_Status_Details,
      action: action
    };
  });
  return (
    <>
      <div className="filterOptionsContainer">
        <h1>All Tools</h1>
      </div>
      <div className="mainContent">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
};

export default AdminInventory;
