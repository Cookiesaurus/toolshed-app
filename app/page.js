import Link from "next/link";
import SlideShow from "@/components/Slideshow/Slideshow";
import PopularTools from "@/components/PopularTools/PopularTools";

export default function Page() {
  const categories = ['Crafting', 'Drill Extension', 'Drywall Tools', 'Electrical', 'Flooring', 'Masonry', 'Misc', 'Painting',
                        'Plumbing', 'Roofing', 'Saw Blades', 'Welding', 'Woodworking'];
  return (
    <>
    <div className="slide-container">
      <div className="categories">
      {categories.map(category => (
        <>
          <div className="category-link">
            <Link 
              href={{
                pathname: '/categories',
                query: {category_name: category} 
              }} 
              key={category}>
                {category}
              </Link>
            <Link href={{
                pathname: '/categories',
                query: {category_name: category} 
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
