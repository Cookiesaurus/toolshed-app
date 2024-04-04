import AdminNavBar from "@/components/Navbar/AdminNavBar"
import AdminSideBar from "@/components/admin/AdminSideBar"
import Breadcrumb from "@/components/BReadCrumb"
export default function Layout({
  children, // will be a page or nested layout
}) {
  return (
    <>
      <AdminNavBar/>
      <Breadcrumb
        homeElement={"Home"}
        containerClasses={"bread-crumb"}
        listClasses={"crumb-init"}
        separator={<span className="seperator"> / </span>}
        activeClasses={"crumb-extra"}
        capitalizeLinks
      />
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