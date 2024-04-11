import Navbar from "@/components/Navbar/Navbar";
import Breadcrumb from "@/components/BreadCrumb";
import Accountnav from "@/components/account/accountnav";
import { getSession } from "@/actions/actions";
export default async function Layout({
  children
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
      <div className="account-cont">
        <Accountnav />
        <div className="right-account">{children}</div>
      </div>
    </>
  );
}
