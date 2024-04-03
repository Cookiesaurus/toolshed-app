import Link from "next/link";
import "./subscription.css";
import Navbar from "@/components/Navbar/Navbar";
export default function Layout({
    children, // will be a page or nested layout
}) {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
}
