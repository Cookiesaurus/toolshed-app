import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/BreadCrumb";
import Accountnav from "@/components/account/accountnav";
export default function Layout({
  children
}) {
  return (
    <>
      <Navbar />
      <Breadcrumb
        homeElement={"Home"}
        containerClasses={"bread-crumb"}
        listClasses={"crumb-init"}
        separator={<span className="seperator"> / </span>}
        activeClasses={"crumb-extra"}
        capitalizeLinks
      />
      <div className="account-cont">
        <Accountnav />
        <div className="right-account">{children}</div>
      </div>
    </>
  );
}
