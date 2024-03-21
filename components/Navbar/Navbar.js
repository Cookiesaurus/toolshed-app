import "./navbar.css";
import { logout } from "@/actions/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCartShopping,
    faUser,
    faMagnifyingGlass,
    faFileInvoice,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { getSession } from "@/actions/actions";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const Navbar = async () => {
    const session = await getSession();
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback(
        (name, value) => {
          const params = new URLSearchParams(searchParams)
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )

    console.log(session);
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
                    onChange={(e)=>{
                        router.push(`/inventory/search` + `?` + createQueryString('search', e.target.value))
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
            <p className="navbar-cart">
                <Link href={"/cart"} className="navbar-link">
                    <FontAwesomeIcon
                        icon={faCartShopping}
                        size="lg"
                        aria-label="Go to cart"
                        style={{ backgroundColor: "white" }}
                    />
                </Link>
            </p>
            <div className="account-hover">
                <p className="navbar-account">
                    <Link href={"/login"} className="navbar-link">
                        {session.isLoggedIn ? "Profile" : "Login"}
                    </Link>
                </p>
                {session.isLoggedIn && <div className="dropdown-content">
                    <div className="account">
                        <p className="navbar-link">
                            <Link
                                href={"/account/profile"}
                                className="navbar-link"
                            >
                                {session.isLoggedIn
                                    ? session.firstName
                                    : "Profile Name "}
                            </Link>
                        </p>
                            <form action={logout}>
                                <button class="" type="submit">Logout</button>
                            </form>
                    </div>{" "}
                    {/* This is going to have to be conditional based on if the user is logged in or not and will have to be styled inline */}
                    <Link href={"/account/profile"}>
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
                    <Link href={"/account/profile"}>
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
                </div>}
            </div>
        </div>
    );
};


export default Navbar;
