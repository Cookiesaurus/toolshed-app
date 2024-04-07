"use client";
import { logout } from "@/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faFileInvoice,
  faGaugeHigh
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [session, setSession] = useState(null);
  useEffect(() => {
    // fetch("/api/me", { cache: "no-cache" })
    fetch("/api/me")
      .then((response) => response.json())
      .then((data) => {
        setSession({
          user: data.user,
          isLoggedIn: data.isLoggedIn
        });
      });
  }, []);
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="navbar">
      <a className="big-header" href="/">SEAC Tool Shed</a>
      <a className="small-header" href="/giftcard">Buy a Gift Card</a>
      <a className="small-header" href="/donate">Donate</a>
      <a className="small-header" href="/about">About</a>
      <a className="small-header" href="/inventory">View All Tools</a>
      <div className="navbar-section">
        <form className="navbar-search" method="get">
          <label htmlFor="navbar-search" className="sr-only">Search products</label>
          <input type="text" name="search" id="navbar-search" aria-label="search products" className="navbar-searchInput"
            onChange={(e) => {
              router.push(
                `/inventory` + `?` + createQueryString("search", e.target.value)
              );
            }}
          />
          <button type="submit" className="navbar-searchIcon" aria-hidden={true} tabIndex={-1}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"
              style={{ color: "white", backgroundColor: "black" }}/>
          </button>
        </form>
      </div>
      <div className="navbar-section">
        <div className="account-hover">
          <a className="login-button" href={session && session.isLoggedIn ? "/account/profile" : "/login"}>
            {session && session.isLoggedIn ? "Profile" : "Login"}
          </a>
          {session && session.isLoggedIn && (
            <div className="dropdown-content">
              <div className="account">
                <p className="navbar-link">
                  <Link href={"/account/profile"} className="navbar-link">
                    {session && session.isLoggedIn
                      ? session.user.First_Name + " " + session.user.Last_Name
                      : "Profile Name "}
                  </Link>
                </p>
              </div>{" "}
              <Link href={"/account/profile"}>
                <FontAwesomeIcon
                  icon={faUser}
                  style={{
                    color: "black",
                    paddingRight: "10px",
                    backgroundColor: "white"
                  }}
                  aria-label="Go to  account settings"
                />
                <p>Account Settings</p>
              </Link>
              <Link href={"/account/transaction-history"}>
                <FontAwesomeIcon
                  icon={faFileInvoice}
                  style={{
                    color: "black",
                    paddingRight: "10px",
                    backgroundColor: "white"
                  }}
                  aria-label="Go to account transaction"
                />
                <p>My transactions</p>
              </Link>
              {(session && session.user.Privilege_Level == 4) ||
              session.user.Privilege_Level == 5 ? (
                <Link href={"/admin/dashboard"}>
                  <FontAwesomeIcon
                    icon={faGaugeHigh}
                    style={{
                      color: "black",
                      paddingRight: "10px",
                      backgroundColor: "white"
                    }}
                    aria-label="Go to account transaction"
                  />
                  <p>Admin Dashbaord</p>
                </Link>
              ) : (
                <></>
              )}
              <form action={logout} className="white logout">
                <button id="logout" className="white">
                  Log Out
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
