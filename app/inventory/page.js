import Link from "next/link"
import Filters from "@/components/Filters/filters"
import InventoryItems from "@/components/InventoryItems/InventoryItems"
import db from "../config/db.mjs"
import { useSearchParams } from "next/navigation"
export default async function Page({searchParams}) {
    // This would be all inventory items 
    const categories = await db.selectFromDB("SELECT * FROM Categories")
    const brands = await db.selectFromDB("SELECT * FROM Brands")
    const types = await db.selectFromDB("SELECT * FROM Types")

    console.log(searchParams)

    return (
        <>
          <div className='bread-crumb'>
              <p className='crumb-init'><Link href={'/'}>SEAC Tool Shed /</Link></p>
              <p className='crumb-init'><Link href={'/'}>Search /</Link></p>
              <p className='crumb-extra'><Link href={'/'}>All Inventory</Link></p>
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
            <Filters categories={categories} brands={brands} types={types}/>
            <InventoryItems/>
          </div>
        </>
      )
}