import SlideShow from "@/components/Carousel/Slideshow";
import Link from "next/link";

export default function Page() {
  return (
    <>
    <SlideShow/>
    <div className="homepage">
    <h2 className="headers">Browsing By Categories</h2>
    <div className="categories">
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
        <div className="cateogry"></div>
    </div>
    <div className="button-center">
      <button type="submit"> <Link href={'/Categories'} className="home-button">View tools by cateogry</Link></button>
    </div>
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
      <button type="submit"> <Link href={'/Inventory'} className="home-button">View popular tools</Link></button>
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
