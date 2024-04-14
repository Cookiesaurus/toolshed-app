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
import { useCallback, useEffect } from "react";

const NavbarMobile = ({session}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  useEffect(() => {
    if (document) {
      window.addEventListener("scroll", function () {
        const navbar = document.querySelector(".navbar");
        if (window.scrollY > 0) {
          navbar.classList.add("fixed");
        } else {
          navbar.classList.remove("fixed");
        }
      });
    }
  });

  const openNav = () => {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  };

  const closeNav = () => {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  };

  return (
    <>
      <div id="mySidebar" className="sidebar">
        <button className="closebtn" onClick={closeNav}>×</button>
        <a className="small-header" href="/giftcard">Buy a Gift Card</a>
        <a className="small-header" href="https://seactoolshed.org/tool-donations/" target="_blank">Donate</a>
        <a className="small-header" href="https://seactoolshed.org/about-seac-tool-shed/" target="_blank">About</a>
        <a className="small-header" href="/inventory">View All Tools</a>
      </div>

      <div id="main">
        <button className="openbtn" onClick={openNav}>☰</button>
        <a className="big-header" href="/">SEAC Tool Shed</a>
      </div>
    </>
  );
};

export default NavbarMobile;