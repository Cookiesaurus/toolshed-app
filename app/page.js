import Link from "next/link";
import SlideShow from "@/components/Slideshow/Slideshow";
import PopularTools from "@/components/PopularTools/PopularTools";
import db from "./config/db.mjs";

export default async function Page() {
	const categories = await db.selectFromDB("SELECT * FROM Categories")

  return (
    <>
    <div className="slide-container">
      <div className="categories">
      {categories.map(category => (
        <>
          <div className="category-link">
            <Link 
              href={{
                pathname: '/inventory/category',
                query: {category_name: category.Category_Name} 
              }} 
              key={category.Category_ID}>
                {category.Category_Name}
              </Link>
            <Link href={{
                pathname: '/inventory/category',
                query: {category_name: category.Category_Name} 
              }}  
              className="cat-arrow" 
              tabIndex={-1}> 
                &#10095;
            </Link>
          </div>
        </>
        ))}
      </div>
        <div className="slide-show">
          <SlideShow/>
        </div>
    </div>
    <div className="homepage">
    <PopularTools/>

</div></>
  )
}
