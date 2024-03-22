'use client'

import Link from 'next/link';
import './filters.css';
import React from 'react';
import { formHandler } from '@/lib/actions/formHandler'; 

const Filters = ({categories, brands, types}) => {
    return (
        <>
            <div className='filters-cont'>
              <form action={formHandler} className='inventory-filters white'>
                <h4 className='filter-headers white'>Categories</h4> 
                <div className='filter white'> 
                  {categories.map(category => (
                    <React.Fragment key={category.Category_ID}>
                      <label htmlFor={category.Category_Name} className='checkbox-container white'>
                      {category.Category_Name}
                        <input type="checkbox" className='checkbox' id={category.Category_Name} name='category' value={category.Category_Name} />
                        <span className="checkmark"></span>
                      </label>
                    </React.Fragment>
                    ))}
                </div>
                <div className='filter-brand white'>
                  <h4 className='filter-headers white'>Brand</h4>
                    <div className='filter white'>
                    {brands.map(brand => (
                      <React.Fragment key={brand.Brand_Name}>
                        <label htmlFor={brand.Brand_Name} className='checkbox-container white' >
                          {brand.Brand_Name}
                          <input type="checkbox" className='checkbox' id={brand.Brand_Name}  name='brand' value={brand.Brand_Name}/>
                          <span className="checkmark"></span>
                        </label>
                      </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className='filter-brand white'>
                  <h4 className='filter-headers white'>Tool Type</h4>
                    <div className='filter white'>
                    {types.map(type => (
                      <React.Fragment key={type.Type_Name}>
                        <label htmlFor={type.Type_Name} className='checkbox-container white' >
                          {type.Type_Name}
                          <input type="checkbox" className='checkbox' id={type.Type_Name}  name='brand' value={type.Type_Name}/>
                          <span className="checkmark"></span>
                        </label>
                      </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className='filter-toggle white'>
                    <p className='white'>In Stock Only</p>
                    <label className="switch white" htmlFor='availability'>
                      <input type="checkbox" id='availability' name='in-stock'/>
                      <span className="slider round"></span>
                    </label>
                </div>

                <div className='filters-conditions white'>
                    <h4 className='filter-headers white'>Location</h4> 
                    <div className='brand-select white'>
                      <label htmlFor='Location-Main' className='checkbox-container white'>
                        Main Location
                        <input type="checkbox" className='checkbox' id='Location-Main' name='main-location'/>
                        <span className="checkmark"></span>
                      </label>
                      <label htmlFor='Location-Truck' className='checkbox-container white'>
                        Truck
                        <input type="checkbox" className='checkbox' id='Location-Truck' name='truck'/>
                        <span className="checkmark"></span>
                      </label>
                    </div>
                </div>
                <button type='submit' id='apply-filters'> Apply Filters</button>
                </form>
            </div>

        </>
    )
}

export default Filters;