import Link from "next/link";
import SlideShow from "@/components/Slideshow/Slideshow";
import PopularTools from "@/components/PopularTools/PopularTools";
import db from "./config/db.mjs";

export default async function Page() {
	const categories = await db.selectFromDB("SELECT * FROM Categories")
  let popular = await db.selectFromDB(`SELECT Tools.Tool_ID, Tools.Tool_Name, Tool_Locations.Location_Name, Tool_Statuses.Tool_Status_Details, Tools.Tool_Link FROM Tools
  INNER JOIN Tool_Locations ON Tools.Home_Location=Tool_Locations.Tool_Location
  INNER JOIN Tool_Statuses ON Tools.Tool_Status=Tool_Statuses.Tool_Status
  WHERE Tools.Is_Featured = 1`)

  //convert to json to send to component 
  popular = JSON.parse(JSON.stringify(popular))
  
  return (
    <>
    <div className="slide-container">
      <div className="categories">
      {categories.map(category => (
        <>
          <table className="category-link">
            <tr className="side-selection">
              <td className="link-container">
                  <Link 
                  href={{
                    pathname: '/inventory/category',
                    query: {category_name: category.Category_Name} 
                  }} 
                  className="link-hypertext"
                  key={category.Category_ID}>
                    {category.Category_Name}
                  </Link>
              </td>
              <td>
                  <Link href={{
                      pathname: '/inventory/category',
                      query: {category_name: category.Category_Name} 
                    }}  
                    className="cat-arrow" 
                    tabIndex={-1}> 
                      &#10095;
                  </Link>
              </td>
            </tr>
          </table>
        </>
        ))}
      </div>
        <div className="slide-show">
          <SlideShow/>
        </div>
    </div>
    <div className="homepage">
    <PopularTools tools={popular}/>

</div></>
  )
}
