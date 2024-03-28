import AdminNavBar from "@/components/Navbar/AdminNavBar"
import Adminnav from "@/components/admin/adminnav"
export default function Layout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <AdminNavBar/>
      <Adminnav/>
      {children}
    </>
  )
}