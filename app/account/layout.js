import Navbar from "@/components/Navbar/Navbar"
import Breadcrumb from "@/components/BreadCrumb"
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
        <Navbar/>
        <Breadcrumb
        homeElement={"Home"}
        containerClasses={"bread-crumb"}
        listClasses={"crumb-init"}
        separator={<span className="seperator"> / </span>}
        activeClasses={"crumb-extra"}
        capitalizeLinks
      />
        {children}
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }