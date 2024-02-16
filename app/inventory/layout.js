import Link from "next/link";
import './inventory.css';
import Filters from "@/components/Filters/filters";

export default function Layout({
    children, // will be a page or nested layout
  }) {

    let popular = [];
    for (let i = 0; i < 5; i++) {
      popular.push(<div className="popular-logo" key={i}></div>);
    }
    
    const numRows = 4;
    const numCols = 5;

    const items = [];

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const key = `${i}-${j}`;
            items.push(<div key={key} className="inventory-item"></div>);
        }
    }


    return (
      <>
        <div className='bread-crumb'>
            <p><Link href={'/'} className='crumb-init'>SEAC Tool Shed /</Link></p>
            <p className='crumb-init'><Link href={'/'} className='crumb-init'>Search /</Link></p>
            <p className='crumb-extra'><Link href={'/'} className='crumb-init'>Inventory</Link></p>
        </div>
        <div className="conditions-cont">
                <div className='conditions'>
                    <div className='inventory-cond'> Condition <span></span> </div>
                    <div className='inventory-cond'> Condition <span></span> </div>
                    <div className='inventory-cond'> Condition <span></span> </div>
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
        <Filters/>
            <div className="inven-cont">
                <div className="inven-items">
                    {items}
                </div>
            </div>
        </div>
        <h3>Most Popular</h3>
        <div className="popular-container">
            {popular}
        </div>
        {/* Have to add in the children param so that the components from the page appear within the layout */}
      </>
    )
  }