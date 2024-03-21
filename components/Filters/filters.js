'use client'

import Link from 'next/link';
import './filters.css';
import React, { useState } from 'react';
import { formHandler } from '@/lib/actions/formHandler'; 

const Filters = () => {
    const brands = ['DEWALT', 'Milwaukee', 'RYOBI', 'BLACK + DECKER', 'Makita', 'RIGID', 'GENESIS', 'Bosch', 'Craftsman',
                    'Rigid', 'Huscky', 'Stanley', 'Hitachi'];

    const categories = ['Crafting', 'Drill Extension', 'Drywall Tools', 'Electrical', 'Flooring', 'Masonry', 'Misc', 'Painting',
                        'Plumbing', 'Roofing', 'Saw Blades', 'Welding', 'Woodworking'];
    
    const [selectedOption, setSelectedOption] = useState('');


    return (
        <>
            <div className='filters-cont'>
              <form action={formHandler} className='inventory-filters white'>
                <h4 className='filter-headers white'>Categories</h4> 
                <div className='filter-categories white'> 
                  {categories.map(category => (
                    <React.Fragment key={category}>
                      <label htmlFor={category} className='checkbox-container white' key={category}>
                        {category}
                        <input type="checkbox" className='checkbox' id={category} key={category} name='category' value={category} />
                        <span className="checkmark"></span>
                      </label>
                    </React.Fragment>
                    ))}
                </div>
                <div className='filter-brand white'>
                  <h4 className='filter-headers white'>Brand</h4>
                    <div className='brand-select white'>
                    {brands.map(brand => (
                      <React.Fragment key={brand}>
                        <label htmlFor={brand} className='checkbox-container white' >
                          {brand}
                          <input type="checkbox" className='checkbox' id={brand} key={brand} name='brand' value={brand}/>
                          <span className="checkmark"></span>
                        </label>
                      </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className='filter-toggle white'>
                    <p >In Stock Only</p>
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