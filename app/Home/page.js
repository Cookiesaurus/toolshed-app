//This is the first page that you see 
import './home.css';
// `app/dashboard/page.js` is the UI for the `/dashboard` URL
export default function Page() {
    return (<>
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
    </>)
  }