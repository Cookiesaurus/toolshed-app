"use client";
import { logout } from "@/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faMagnifyingGlass,
    faFileInvoice,
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
        fetch("/api/me", { cache: "no-cache" })
            .then((response) => response.json())
            .then((data) => {
                setSession({
                    user: data.user,
                    isLoggedIn: data.isLoggedIn,
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
        <div
            className="navbar"
            role="Navigation"
            aria-label="Website Navigation"
        >
            <Link href={"/"} aria-label="Go to home" className="navbar-link">
                <p className="navbar-logo">SEAC’s Tool Shed</p>
            </Link>
            <div className="giftcard-inventory">
                <Link
                    href={"/giftcard"}
                    aria-label="Go to gift cards"
                    className="navbar-link"
                >
                    <p>Gift Card</p>
                </Link>
                <Link
                    href={"/inventory"}
                    aria-label="Go to inventory"
                    className="navbar-link"
                >
                    <p>View All Tools</p>
                </Link>
            </div>
            <form className="navbar-search" method="get">
                <label htmlFor="navbar-search" className="sr-only">
                    Search products
                </label>
                <input
                    type="text"
                    name="search"
                    id="navbar-search"
                    aria-label="search products"
                    onChange={(e) => {
                        router.push(
                            `/inventory` +
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
            <div className="account-hover">
                <p className="navbar-account">
                <Link href={session && session.isLoggedIn ? "/account" : "/login"} className="navbar-link">
                    {session && session.isLoggedIn ? "Profile" : "Login"}
                </Link>
                </p>
                {session && session.isLoggedIn && (
                    <div className="dropdown-content">
                        <div className="account">
                            <p className="navbar-link">
                                <Link
                                    href={"/account"}
                                    className="navbar-link"
                                >
                                    {session && session.isLoggedIn
                                        ? session.user.First_Name +
                                          " " +
                                          session.user.Last_Name
                                        : "Profile Name "}
                                </Link>
                            </p>
                        </div>{" "}
                        {/* This is going to have to be conditional based on if the user is logged in or not and will have to be styled inline */}
                        <Link href={"/account"}>
                            <FontAwesomeIcon
                                icon={faUser}
                                style={{
                                    color: "black",
                                    paddingRight: "10px",
                                    backgroundColor: "white",
                                }}
                                aria-label="Go to  account settings"
                            />
                            <p>Account Settings</p>
                        </Link>
                        <Link href={"/account"}>
                            <FontAwesomeIcon
                                icon={faFileInvoice}
                                style={{
                                    color: "black",
                                    paddingRight: "10px",
                                    backgroundColor: "white",
                                }}
                                aria-label="Go to account transaction"
                            />
                            <p>My transactions</p>
                        </Link>
                        <form action={logout}>
                            <button>Logout</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
