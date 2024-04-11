import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/BreadCrumb";
import { getSession } from "@/actions/actions";
export default async function Layout({
    children, // will be a page or nested layout
  }) {
    let session = await getSession()
    session = JSON.parse(JSON.stringify(session))
    return (
      <>
        <Navbar session={session}/>
        <Breadcrumb
        homeElement={"Home"}
        containerClasses={"bread-crumb"}
        listClasses={"crumb-init"}
        separator={<span className="seperator"> / </span>}
        activeClasses={"crumb-extra"}
        capitalizeLinks
      />
        {children}
      </>
    )
  }