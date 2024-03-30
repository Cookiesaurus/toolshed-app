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
      name: "Location",
      selector: (row) => row.location,
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
      <div>
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
        <br />
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
    );
    return {
      id: item.Tool_ID,
      name: item.Tool_Name,
      location: item.Location_Name,
      type: "",
      brand: "",
      status: item.Tool_Status_Details,
      action: action
    };
  });
  return (
    <>
      <div className="mainContent">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
};

export default AdminInventory;
