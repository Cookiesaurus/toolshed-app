"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import DataTable from "react-data-table-component";
const CheckOut = ({customers}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true
    },
    {
      name: "Membership",
      selector: (row) => row.membership,
      sortable: true
    },
    {
      name: "Action",
      selector: (row) => row.type,
      sortable: true
    },
  ];

  return (
    <>
    <div className="checkout-container white">
        <div className="white">
        <label htmlFor="find user" className="sr-only">Find User</label>
        <input
            type="text"
            name="find user"
            id="navbar-search"
            aria-label="search products"
            onChange={(e) => {
            router.push(`?` + createQueryString("name", e.target.value));
            }}
            placeholder="Find User"
        />
        <button
            type="submit"
            className="navbar-searchIcon white"
            aria-hidden={true}
            tabIndex={-1}
        >
            <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            style={{ color: "white", backgroundColor: "black" }}
            />
        </button>
        </div>
        <div className="checkout-buttons white">
            <p className="white">Or</p>
            <Link href={'/admin/customers/createuser'} className="link-button">Create New Customer</Link>
        </div>
    </div>
    <div>
        <DataTable
          columns={columns}
          pagination
          highlightOnHover
        />
    </div>
    </>
  );
};

export default CheckOut;
