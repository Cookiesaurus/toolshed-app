'use client'

import Link from 'next/link';
import './filters.css';
import { useState } from 'react';

const Filters = () => {
    const brands = [];

    for (let i = 0; i < 16; i++) {
      brands.push(
        <><input type="checkbox" id={i} name={`brand:`+ i} value={`brand:`+ i} onChange={null}/>
        <label for="vehicle1"> Brand Name</label><br/><br/></>
      );
    }
    const filters = [];

    for (let i = 0; i < 16; i++) {
      filters.push(
        <><input type="checkbox" id={i} name={`filter:`+ i} value={`filter:`+ i} onChange={null}/>
        <label for="vehicle1"> Filter Condition </label><br/><br/></>
      );
    }



    return (
        <>
            <div className='filters-cont'>
                <h4>Categories</h4>
                <h4>Price Range</h4>
                <div className='price-range'>
                    <input type='number' value={0} onChange={null}/>
                    <p>-</p>
                    <input type='number' value={1000}/>
                </div>
                <div className='range'>
                    <input type='range' min={0} max={1000} value={0} onChange={null}/>
                </div>
                <h4>Search by brand</h4>
                <div className='filter-brand'>
                    <input type='text' placeholder='Search' id='brand-search'/>
                    <div className='brand-select'>
                        {brands}
                    </div>
                </div>
                <div className='filter-toggle'>
                    <p>New Products</p> <p>toggle</p>
                    <p>Discounts</p>  <p>Toogle</p>
                </div>

                <div className='filters-conditions'>
                    <input type='text' placeholder='Search' id='brand-search'/>
                    <div className='brand-select'>
                        {filters}
                    </div>
                </div>
                <button type='submit'> Apply Filters</button>
            </div>

        </>
    )
}

export default Filters;