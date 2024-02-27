'use client'

import Link from 'next/link';
import './catoverlay.css';
import React from 'react';
import { useState, useEffect } from 'react';
import { formHandler } from '@/lib/actions/formHandler';

const CatFilters = () => {
    const brands = ['DEWALT', 'Milwaukee', 'RYOBI', 'BLACK + DECKER', 'Makita', 'RIGID', 'GENESIS', 'Bosch', 'Craftsman',
    'Rigid', 'Huscky', 'Stanley', 'Hitachi'];

    const catalogs = ['Power Drills', 'Hammer Drills', 'Dies', 'Taps', 'Drill Bites', 'Special Drills', 'Impact Wrenches',
                    'Drill Attachments', 'Drill Extension'];


    return (
        <>
        <div className='filters-cont'>
        <div className='results'>
            <h1>Drill</h1>
            <p>53 Results</p>
        </div>
        <form action={formHandler} className='inventory-filters white'>
          <h4 className='filter-headers white'>Catalog</h4> 
          <div className='filter-categories white'> 
            {catalogs.map(catalog => (
              <React.Fragment key={catalog}>
                <label htmlFor={catalog} className='checkbox-container white' key={catalog} >
                  {catalog}
                  <input type="checkbox" className='checkbox' id={catalog} key={catalog} name='catalog' value={catalog}/>
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
              <p className='white'>In Stock Only</p>
              <label className="switch white" htmlFor='availability'>
                <input type="checkbox" id='availability' name='in-stock'/>
                <span className="slider round"></span>
              </label>
          </div>

          <div className='filters-conditions white'>

            <h4 className='filter-headers white'>Cordless/Corded</h4> 
              <div className='brand-select white'>
              <label htmlFor='cordeless' className='checkbox-container white' >
                    Cordless
                <input type="checkbox" className='checkbox' id='cordeless'  name='filter-cordeless'/>
                <span className="checkmark"></span>
                </label>

                <label htmlFor='corded' className='checkbox-container white' >
                    Corded
                <input type="checkbox" className='checkbox' id='corded' name='filter-corded'/>
                <span className="checkmark"></span>
                </label>

                <label htmlFor='hybrid' className='checkbox-container white' >
                    Hybrid
                <input type="checkbox" className='checkbox' id='hybrid' name='filter-hybrid'/>
                <span className="checkmark"></span>
                </label>
              </div>

            <h4 className='filter-headers white'>Motor Type</h4> 
              <div className='brand-select white'>
              <label htmlFor='brushless' className='checkbox-container white' >
                   Brushless
                <input type="checkbox" className='checkbox' id='brushless' name='filter-brushless'/>
                <span className="checkmark"></span>
                </label>

                <label htmlFor='brushed' className='checkbox-container white' >
                    Brushed
                <input type="checkbox" className='checkbox' id='brushed' name='filter-brushed'/>
                <span className="checkmark"></span>
                </label>

                <label htmlFor='MotorType-hybrid' className='checkbox-container white' >
                   Hybrid
                <input type="checkbox" className='checkbox' id='MotorType-hybrid' name='filter-hybridmotor'/>
                <span className="checkmark"></span>
                </label>
              </div>
              
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

export default CatFilters