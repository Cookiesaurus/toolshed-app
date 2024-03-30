import Adminnav from "@/components/admin/AdminSideBar"
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
      <div className="account-cont">
        <div className="right-admin">
          {children}
        </div>  
      </div>
      </>
    )
  }