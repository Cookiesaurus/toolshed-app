'use client'

import './filters.css';
import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {useState } from 'react';

const Filters = ({categories, brands, types, locations}) => {

  //Arrays to hold the values of the input from the checkboxes
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);

  //Constructors to update URL Params 
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = new URLSearchParams(searchParams)

  //****ON CHANGE EVENT HANDLERS**** */
  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    const isChecked = event.target.checked;
    setSelectedCategories((prevSelectedCategories) =>
      isChecked
        ? [...prevSelectedCategories, categoryName]
        : prevSelectedCategories.filter((category) => category !== categoryName)
    );

    UpdateURLParams({ category: isChecked ? [...selectedCategories, categoryName] : selectedCategories.filter((category) => category !== categoryName) });
  };

  const handleBrandChange = (event) => {
    const brandName = event.target.value;
    const isChecked = event.target.checked;
    setSelectedBrands((prevSelectedBrand) =>
      isChecked
        ? [...prevSelectedBrand, brandName]
        : prevSelectedBrand.filter((brandName) => brandName !== brandName)
    );

    UpdateURLParams({ brand: isChecked ? [...selectedBrands, brandName] : selectedBrands.filter((brandName) => brandName !== brandName) });
  };

  const handleTypeChange = (event) => {
    const toolType = event.target.value;
    const isChecked = event.target.checked;
    setSelectedTypes((prevSelectedType) =>
      isChecked
        ? [...prevSelectedType, toolType]
        : prevSelectedType.filter((toolType) => toolType !== toolType)
    );

    UpdateURLParams({ type: isChecked ? [...selectedTypes, toolType] : selectedTypes.filter((toolType) => toolType !== toolType) });
  };

  const handleStockChange = (event) => {
    const availability = event.target.value;
    const isChecked = event.target.checked;
    setSelectedStock((prevSelectedStock) =>
      isChecked
        ? [...prevSelectedStock, availability]
        : prevSelectedStock.filter((availability) => availability !== availability)
    );

    UpdateURLParams({ in_stock: isChecked ? [...selectedStock, availability] : selectedStock.filter((availability) => availability !== availability) });
  };

  // Function to iterate through the arrays of input values and update the URL search qury params 
  const UpdateURLParams = (params) =>{
    for (const [key, value] of Object.entries(params)) {
        filterParams.set(key, value)
    }
    router.push(`/inventory` + `?` + filterParams.toString())
  }


    return (
        <>
            <div className='filters-cont'>
              <form className='inventory-filters white'>
                <h4 className='filter-headers white'>Categories</h4> 
                <div className='filter white'> 
                  {categories.map(category => (
                    <React.Fragment key={category.Category_ID}>
                      <label htmlFor={category.Category_Name} className='checkbox-container white'>
                      {category.Category_Name}
                        <input 
                          type="checkbox" 
                          className='checkbox' 
                          id={category.Category_Name} 
                          name='category' 
                          value={category.Category_Name}
                          onChange={(e)=>{handleCategoryChange(e)}} 
                          />
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
                          <input 
                            type="checkbox" 
                            className='checkbox' 
                            id={brand.Brand_Name}  
                            name='brand' 
                            value={brand.Brand_Name}
                            onChange={(e)=>{handleBrandChange(e)}} 
                            />
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
                          <input 
                            type="checkbox" 
                            className='checkbox' 
                            id={type.Type_Name}  
                            name='brand' 
                            value={type.Type_Name}
                             onChange={(e)=>{handleTypeChange(e)}} 
                            />
                          <span className="checkmark"></span>
                        </label>
                      </React.Fragment>
                    ))}
                    </div>
                </div>
                <div className='filter-toggle white'>
                    <p className='white'>In Stock Only</p>
                    <label className="switch white" htmlFor='availability'>
                      <input 
                        type="checkbox" 
                        id='availability' 
                        name='in-stock'
                        onChange={(e)=>{handleStockChange(e)}} 
                        />
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
                </form>
            </div>

        </>
    )
}

export default Filters;