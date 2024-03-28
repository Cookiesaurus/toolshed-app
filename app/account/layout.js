import Navbar from "@/components/Navbar/Navbar"
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
      <>
        <Navbar/>
        {children}
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }