"use client";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
const ViewUserLoan = ({ customerData }) => {
  const columns = [
    {
      name: "Date",
      selector: (row) => row.id
    },
    {
      name: "Amount",
      selector: (row) => row.name,
      sortable: true
    },
    {
      name: "Payment Method",
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: "Loan Items",
      selector: (row) => row.organization,
      sortable: true
    },
    {
      name: "Membership",
      selector: (row) => row.membership,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => row.action
    }
  ];

  const data = customerData.map((user) => {
    let membership;
    if (user.Membership_Level === 1) {
      membership = "Tinkerer";
    } else if (user.Membership_Level === 2) {
      membership = "MacGyver";
    } else if (user.Membership_Level === 3 || user.Membership_Level === 4) {
      membership = "Builder";
    }
    let expirationDate = new Date(user.Membership_Expiration_Date);
    expirationDate = expirationDate.toDateString();

    let name = user.First_Name + " " + user.Last_Name;

    const actions = (
      <div>
        <Link
          className="loansButton"
          href={{
            pathname: "/admin/customers/loan/details",
            query: { account_id: user.Account_ID }
          }}
        >
          <FontAwesomeIcon
            icon={faCircleInfo}
            style={{ backgroundColor: "transparent" }}
          />
          Details
        </Link>
        <br />
      </div>
    );

    return {
      id: user.Account_ID,
      name: name,
      email: user.Email,
      organization: user.Organization_Name,
      membership: membership,
      member_expiration: expirationDate,
      action: actions
    };
  });

  return (
    <>
      <div className="title_and_buttons">
      {customerData.map((user) => (
  <>
    <h1>{user.First_Name + " " + user.Last_Name}</h1>
    <div className="buttonsContainer">
      <Link
        href={{
          pathname: "/admin/customers/transactions",
          query: { account_id: user.Account_ID }
        }}
      >
        <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
        Add a transaction
      </Link>
    </div>
  </>
))}
      </div>

      <div className="mainContent">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
};

export default ViewUserLoan;
