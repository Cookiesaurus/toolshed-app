"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faCartShopping,
  faHandHolding
} from "@fortawesome/free-solid-svg-icons";
import DataTable from "react-data-table-component";

const ViewAllUsers = ({ customerData }) => {
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
      name: "Email",
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: "Organization",
      selector: (row) => row.organization,
      sortable: true
    },
    {
      name: "Membership",
      selector: (row) => row.membership,
      sortable: true
    },
    {
      name: "Mempership Expiration",
      selector: (row) => row.member_expiration,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => row.action
    }
  ];
  const data = customerData.map((user) => {
    let expirationDate = new Date(user.Expiration_Date);
    expirationDate = expirationDate.toDateString();

    const actions = (
      <div className="actions-links" role="list" aria-label="actions">
        <div className="action" role="listitem">
        <Link
          className="editButton"
          href={{
            pathname: "/admin/customers/edit",
            query: { account_id: user.Account_ID }
          }}
          
        >
          <FontAwesomeIcon
            icon={faPencil}
            color="white"
            style={{ backgroundColor: "transparent" }}
          />
          Edit User
        </Link>
        </div>
          <div className="action" role="listitem">
        <Link
          className="loansButton"
          href={{
            pathname: "/admin/customers/loan",
            query: { account_id: user.Account_ID }
          }}
        >
          <FontAwesomeIcon
            icon={faHandHolding}
            color="white"
            style={{ backgroundColor: "transparent" }}
          />
          User Loans
        </Link>
        </div>
        <div className="action" role="listitem">
        <Link
          className="checkinButton"
          href={{
            pathname: "/admin/customers/checkin",
            query: { account_id: user.Account_ID }
          }}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            color="white"
            style={{ backgroundColor: "transparent" }}
          />
          Check In
        </Link>
        </div>
        <div className="action" role="listitem">
        <Link
          className="checkoutButton"
          href={{
            pathname: "/admin/customers/checkout",
            query: { account_id: user.Account_ID }
          }}
        >
          <FontAwesomeIcon
            icon={faCartShopping}
            color="white"
            style={{ backgroundColor: "transparent" }}
          />
          Check Out
        </Link>
        </div>
      </div>
    );

    return {
      id: user.Account_ID,
      name: user.Name,
      email: user.Email,
      organization: user.Organization,
      membership: user.Membership_Title,
      member_expiration: expirationDate,
      action: actions
    };
  });

  return (
    <>
      <div className="filterOptionsContainer">
        <h1>All Users</h1>
      </div>

      <div className="mainContent">
        <DataTable columns={columns} data={data} pagination/>
      </div>
    </>
  );
};

export default ViewAllUsers;
