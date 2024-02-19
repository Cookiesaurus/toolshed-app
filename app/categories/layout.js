import Link from 'next/link';
import './categories.css';
import CatFilters from '@/components/CategoryFilters/CatFilters';
import InventoryItems from '@/components/InventoryItems/InventoryItems';
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
            <p className='crumb-init'><Link href={'/'}>SEAC Tool Shed /</Link></p>
            <p className='crumb-init'><Link href={'/'}>Search /</Link></p>
            <p className='crumb-extra'><Link href={'/'}>Specifc Search</Link></p>
        </div>
        <div className="conditions-cont">
                <div className='conditions'>
                    {/* <div className='inventory-cond'> Condition <span></span> </div>
                    <div className='inventory-cond'> Condition <span></span> </div>
                    <div className='inventory-cond'> Condition <span></span> </div> */}
                </div>
                <div className="sort">
                    <select id="filter-sort">
                        <option value="0">Sort By:</option>
                        <option value="1">Featured</option>
                        <option value="1">Popular</option>
                        <option value="1">Price: Low to High</option>
                        <option value="1">Price: High to Low</option>
                    </select>
                </div>
            </div>
        <div className='inventory-cont'>
            <CatFilters/>
            <InventoryItems/>
        </div>
         {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }