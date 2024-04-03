import AdminNavBar from "@/components/Navbar/AdminNavBar"
import AdminSideBar from "@/components/admin/AdminSideBar"
export default function Layout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <AdminNavBar/>
       <div className="admin-container">
        <div className="left-admin">
          <AdminSideBar/>
        </div>
       <div className="right-admin">
          {children}
        </div>
       </div>
    </>
  )
}