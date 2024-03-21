import Link from "next/link";
import './inventory.css';
import Filters from "@/components/Filters/filters";
import InventoryItems from "@/components/InventoryItems/InventoryItems";

export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
        {children}
      </>
    )
  }