import Link from "next/link";
import './giftcard.css';
import Giftcards from "@/components/account/giftcards";
import Accountnav from "@/components/account/accountnav";
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
      {children}
      </>
    )
  }