'use client'

import Link from 'next/link';
import './filters.css';
import React, { useState } from 'react';

const Filters = () => {
    const brands = ['DEWALT', 'Milwaukee', 'RYOBI', 'BLACK + DECKER', 'Makita', 'RIGID', 'GENESIS', 'Bosch', 'Craftsman',
                    'Rigid', 'Huscky', 'Stanley', 'Hitachi'];

    const categories = ['Crafting', 'Drill Extension', 'Drywall Tools', 'Electrical', 'Flooring', 'Masonry', 'Misc', 'Painting',
                        'Plumbing', 'Roofing', 'Saw Blades', 'Welding', 'Woodworking'];
    
    const [selectedOption, setSelectedOption] = useState('');

    return (
        <>
            <div className='filters-cont'>
              <form method='get' className='inventory-filters white'>
                <h4 className='filter-headers white'>Categories</h4> 
                <div className='filter-categories white'> 
                  {categories.map(category => (
                    <React.Fragment key={category}>
                      <label htmlFor={category} className='checkbox-container white' key={category} >
                        {category}
                        <input type="checkbox" className='checkbox' id={category} key={category} />
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
                          <input type="checkbox" className='checkbox' id={brand} key={brand} />
                          <span className="checkmark"></span>
                        </label>
                      </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className='filter-toggle white'>
                    <p className='white'>In Stock Only</p>
                    <label className="switch white" htmlFor='new-products'>
                      <input type="checkbox" id='new-products'/>
                      <span className="slider round"></span>
                    </label>
                </div>

                <div className='filters-conditions white'>
                  {/* <h4 className='filter-headers'>Cordless/Corded</h4> 
                    <div className='brand-select'>
                      <label htmlFor='filter-cordless'>Cordless</label>
                      <input type="checkbox" className='checkbox' id='filter-cordless'  />
                      <label htmlFor='filter-corded'>Corded</label>
                      <input type="checkbox" className='checkbox' id='filter-corded'  />
                      <label htmlFor='filter-cordless'>Hybrid</label>
                      <input type="checkbox" className='checkbox' id='filter-hybrid'  />
                    </div> */}
                    <h4 className='filter-headers white'>Location</h4> 
                    <div className='brand-select white'>
                      <label htmlFor='Location-Main' className='checkbox-container white'>
                        Main Location
                        <input type="checkbox" className='checkbox' id='Location-Main'/>
                        <span className="checkmark"></span>
                      </label>
                      <label htmlFor='Location-Truck' className='checkbox-container white'>
                        Truck
                        <input type="checkbox" className='checkbox' id='Location-Truck'/>
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