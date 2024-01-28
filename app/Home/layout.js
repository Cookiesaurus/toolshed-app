import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import SlideShow from "@/components/Carousel/Slideshow";
import './home.css';
export default function Layout({
    children, // will be a page or nested layout
  }) {
    return (
    <>
      <Navbar/>
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

        <h2>Browsing By Brands</h2>
        <div className="brands">
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
                <div className="brand"></div>
        </div>

    </div>
    <Footer/>
    </>
    )
  }