"use client";

import "./navbar_admin.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faUser,
  faMagnifyingGlass,
  faFileInvoice
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const AdminNavBar = () => {
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

  return (
    <div className="navbar" role="Navigation" aria-label="Website Navigation">
      <Link href={"/"} aria-label="Go to home" className="navbar-link">
        <p className="navbar-logo">SEAC Tool Shed</p>
      </Link>
      <form className="navbar-search">
        <label htmlFor="navbar-search" className="sr-only">
          Find User
        </label>
        <input
          type="text"
          name="search"
          id="navbar-search"
          aria-label="find user"
          placeholder="Find user"
          onChange={(e) => {
            router.push(
              `/admin/customers/edit` +
                `?` +
                createQueryString("search", e.target.value)
            );
          }}
        />
        <button
          type="submit"
          className="navbar-searchIcon"
          aria-hidden={true}
          tabIndex={-1}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            style={{ color: "white", backgroundColor: "black" }}
          />
        </button>
        <label htmlFor="navbar-search" className="sr-only">
          Search products
        </label>
        <input
          type="text"
          name="search"
          id="navbar-search"
          aria-label="search inventory"
          placeholder="Search inventory"
          onChange={(e) => {
            router.push(
              `/admin/inventory/edit` +
                `?` +
                createQueryString("search", e.target.value)
            );
          }}
        />
        <button
          type="submit"
          className="navbar-searchIcon"
          aria-hidden={true}
          tabIndex={-1}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            size="lg"
            style={{ color: "white", backgroundColor: "black" }}
          />
        </button>
      </form>
      <p className="navbar-account">
        <Link href={"/login"} className="navbar-link">
          Example Admin
        </Link>
      </p>
    </div>
  );
};

export default AdminNavBar;
