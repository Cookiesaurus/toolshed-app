import Link from 'next/link';
import './categories.css';
export default function Layout({
    children, // will be a page or nested layout
  }) {
    let categories = [];

    for (let i = 0; i < 20; i++) {
      categories.push(<div className="category-logo" key={i}></div>);
    }

    let popular = [];
    for (let i = 0; i < 5; i++) {
      popular.push(<div className="popular-logo" key={i}></div>);
    }
    return (
      <>
      <div className='bread-crumb'>
        <p><Link href={'/'} className='crumb-init'>SEAC Tool Shed /</Link></p><p className='crumb-extra'>Categories</p>
      </div>
      <div className="cat-page">
        {categories}
        
      </div>
      <h2>Most popular</h2>
      <div className='popular-container'>
        {popular}
      </div>
         {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }