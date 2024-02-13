import SlideShow from "@/components/Carousel/Slideshow";
import Link from "next/link";

export default function Page() {
  return (
    <>
    <div className="slide-container">
      <div className="categories">
        <div className="category-link">
          <Link href={'/'}>Crafting</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Drill Extension</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Drywall Tools</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Electrical</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Flooring</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Masonry</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Painting</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Plumbing</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Roofing</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
        <div className="category-link">
          <Link href={'/'}>Woodworking</Link>
          <Link href={'/'} className="cat-arrow"> &#10095;</Link>
        </div>
      </div>
        <div className="slide-show">
          <SlideShow/>
        </div>
    </div>
    <div className="homepage">
    <h2> Popular Tools</h2>
    <div className="popular-container">
        <div className="popular-container">
            <div className="popular"></div>
            <div className="popular"></div>
            <div className="popular"></div>
            <div className="popular"></div>
            <div className="popular"></div>
        </div>
    </div>
    <div className="button-center">
      <button type="submit"> <Link href={'/Inventory'} className="home-button">View All Tools</Link></button>
    </div>

    <h2>Browsing By Brands</h2>
    <div className="brands">
            <div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div>
            <div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div><div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div>
            <div className="brand">
              <Link href={'/Categories'}>Brand</Link>
            </div>
    </div>

</div></>
  )
}
