import AdminNavBar from "@/components/Navbar/AdminNavBar"
import AdminSideBar from "@/components/admin/AdminSideBar"
import Breadcrumb from "@/components/BreadCrumb"
import { getSession } from "@/actions/actions"
export default async function Layout({
  children, // will be a page or nested layout
}) 
{
  let session = await getSession()
  session = JSON.parse(JSON.stringify(session))
  return (
    <>
      <AdminNavBar session={session}/>
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