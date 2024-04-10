"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

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

  const [session, setSession] = useState(null);
  useEffect(() => {
    fetch("/api/me")
      .then((response) => response.json())
      .then((data) => {
        setSession({
          user: data.user,
          isLoggedIn: data.isLoggedIn
        });
      });
  }, []);

  return (
    <div className="navbar" role="Navigation" aria-label="Website Navigation">
      <Link href={"/"} aria-label="Go to home" className="navbar-link">
        <p className="navbar-logo">SEAC’s Tool Shed</p>
      </Link>
      <form className="admin-navbar-search">
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
        <Link href={"/admin/dashboard"} className="navbar-link">
        {session && session.isLoggedIn
                    ? session.user.First_Name + " " + session.user.Last_Name
                    : "Profile Name "}
        </Link>
      </p>
    </div>
  );
};

export default AdminNavBar;
