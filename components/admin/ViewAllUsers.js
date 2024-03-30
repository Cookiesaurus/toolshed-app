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
          Edit
        </Link>
        <br />
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
          Loans
        </Link>
        <br />
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
          Checkout
        </Link>
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
      <div className="filterOptionsContainer">
        <form className="filterOptions">
          <input list="type" name="type" placeholder=" Find User" />
          <datalist id="type">
            {/* <option value="option1"/>
                        <option value="option2"/>
                        <option value="option3"/>
                        <option value="option4"/>
                        <option value="option5"/> */}
          </datalist>
        </form>
      </div>

      <div className="mainContent">
        <DataTable columns={columns} data={data} pagination />
      </div>
    </>
  );
};

export default ViewAllUsers;
