"use client";
import { logout } from "@/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMagnifyingGlass,
  faFileInvoice,
  faGaugeHigh
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useCallback, useState, useEffect } from "react";

const AdminNavBar = ({session}) => {
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

  useEffect(()=>{
    if(document){
      window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 0) {
          navbar.classList.add('fixed');
        } else {
          navbar.classList.remove('fixed');
        }
      });
    }
  })

  return (
    <div className="navbar">
      <a className="big-header" href="/">SEAC Tool Shed</a>
      <div className="navbar-section">
        <form className="navbar-search">
          <input type="text" name="search" id="navbar-search" aria-label="find user" className="navbar-searchInput"
            placeholder=" Find user"
            onChange={(e) => {
              router.push(
                `/admin/customers/search` +
                  `?` +
                  createQueryString("searchTerm", e.target.value)
              );
            }}
          />
          <button type="submit" className="navbar-searchIcon" 
            aria-hidden={true} tabIndex={-1}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"
              style={{ color: "white", backgroundColor: "black" }}
            />
          </button>
        </form>
      </div>
      <div className="navbar-section">
        <form className="navbar-search">
          <input type="text" name="search" id="navbar-search" aria-label="search inventory" className="navbar-searchInput"
            placeholder=" Search inventory"
            onChange={(e) => {
              router.push(
                `/admin/inventory/search` +
                  `?` +
                  createQueryString("searchTerm", e.target.value)
              );
            }}
          />
          <button type="submit" className="navbar-searchIcon" aria-hidden={true} tabIndex={-1}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size="lg"
              style={{ color: "white", backgroundColor: "black" }}
            />
          </button>
        </form>
      </div>
      <div className="navbar-section">
        <div className="account-hover">
        <Link className="login-button"
            href={{
              pathname: session && session.isLoggedIn ? "/account/profile" : "/login",
              query: { account_id: session?.user?.Account_ID }
            }}
          >
            {session && session.isLoggedIn ? "Profile" : "Login"}
          </Link>
          {session && session.isLoggedIn && (
            <div className="dropdown-content">
              <div className="account">
                <p className="navbar-link">
                  {session && session.isLoggedIn
                    ? session.user.First_Name + " " + session.user.Last_Name
                    : "Profile Name "}
                </p>
              </div>{" "}
              <Link href={{
                  pathname: "/account/profile",
                  query: { account_id: session?.user?.Account_ID }
                }}>
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
              <Link href={{
                  pathname: "/account/transaction-history",
                  query: { account_id: session?.user?.Account_ID }
                }}>
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

export default AdminNavBar;
