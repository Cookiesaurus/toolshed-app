"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const Filters = ({ categories, brands, types, locations, totalTools }) => {
  //Arrays to hold the values of the input from the checkboxes
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState([]);
  const [selectedStock, setSelectedStock] = useState([]);

  //Constructors to update URL Params
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = new URLSearchParams(searchParams);

  //****ON CHANGE EVENT HANDLERS**** */
  const handleCategoryChange = (event) => {
    const categoryName = event.target.value;
    const isChecked = event.target.checked;
    setSelectedCategories((prevSelectedCategories) =>
      isChecked
        ? [...prevSelectedCategories, categoryName]
        : prevSelectedCategories.filter((category) => category !== categoryName)
    );

    UpdateURLParams({
      category: isChecked
        ? [...selectedCategories, categoryName]
        : selectedCategories.filter((category) => category !== categoryName)
    });
  };

  const handleBrandChange = (event) => {
    const brandName = event.target.value;
    const isChecked = event.target.checked;

    setSelectedBrands((prevSelectedBrands) =>
      isChecked
        ? [...prevSelectedBrands, brandName]
        : prevSelectedBrands.filter((brand) => brand !== brandName)
    );

    const updatedBrands = isChecked
      ? [...selectedBrands, brandName]
      : selectedBrands.filter((brand) => brand !== brandName);

    UpdateURLParams({ brand: updatedBrands });
  };

  const handleTypeChange = (event) => {
    const toolType = event.target.value;
    const isChecked = event.target.checked;

    setSelectedTypes((prevSelectedTypes) =>
      isChecked
        ? [...prevSelectedTypes, toolType]
        : prevSelectedTypes.filter((type) => type !== toolType)
    );

    const updatedTypes = isChecked
      ? [...selectedTypes, toolType]
      : selectedTypes.filter((type) => type !== toolType);

    UpdateURLParams({ type: updatedTypes });
  };

  const handleStockChange = (event) => {
    const availability = event.target.value;
    const isChecked = event.target.checked;

    setSelectedStock((prevSelectedStock) =>
      isChecked
        ? [...prevSelectedStock, availability]
        : prevSelectedStock.filter((stock) => stock !== availability)
    );

    const updatedStock = isChecked
      ? [...selectedStock, availability]
      : selectedStock.filter((stock) => stock !== availability);

    UpdateURLParams({ in_stock: updatedStock });
  };

  const handleLocationChange = (event) => {
    const location = event.target.value;
    const isChecked = event.target.checked;

    setSelectedLocation((prevSelectedLocation) =>
      isChecked
        ? [...prevSelectedLocation, location]
        : prevSelectedLocation.filter((loc) => loc !== location)
    );

    const updatedLocation = isChecked
      ? [...selectedLocation, location]
      : selectedLocation.filter((loc) => loc !== location);

    UpdateURLParams({ location: updatedLocation });
  };

  // Function to iterate through the arrays of input values and update the URL search qury params
  const UpdateURLParams = (params) => {
    for (const [key, value] of Object.entries(params)) {
      filterParams.set(key, value);
    }
    router.push(`/inventory` + `?` + filterParams.toString());
  };

  // const removeQueryParam = (param) => {
  //   const { pathname, query } = router;
  //   const params = new URLSearchParams(query);
  //   params.delete(param);
  //   router.replace(
  //       { pathname, query: params.toString() },
  //       undefined,
  //       { shallow: true }
  //   );
  // };


  return (
    <>
      <div className="filters-cont">
        <div className="results">
          <p>{totalTools} Results</p>
        </div>
        <form className="inventory-filters white">
          <h4 className="filter-headers white">Categories</h4>
          <div className="filter white">
            {categories.map((category) => (
              <React.Fragment key={category.Category_ID}>
                <label
                  htmlFor={category.Category_Name}
                  className="checkbox-container white"
                >
                  {category.Category_Name}
                  <input
                    type="checkbox"
                    className="checkbox"
                    id={category.Category_Name}
                    name="category"
                    value={category.Category_Name}
                    onChange={(e) => {
                      handleCategoryChange(e);
                    }}
                  />
                  <span className="checkmark"></span>
                </label>
              </React.Fragment>
            ))}
          </div>
          <div className="filter-brand white">
            <h4 className="filter-headers white">Brand</h4>
            <div className="filter white">
              {brands.map((brand) => (
                <React.Fragment key={brand.Brand_Name}>
                  <label
                    htmlFor={brand.Brand_Name}
                    className="checkbox-container white"
                  >
                    {brand.Brand_Name}
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={brand.Brand_Name}
                      name="brand"
                      value={brand.Brand_Name}
                      onChange={(e) => {
                        handleBrandChange(e);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="filter-brand white">
            <h4 className="filter-headers white">Tool Type</h4>
            <div className="filter white">
              {types.map((type) => (
                <React.Fragment key={type.Type_Name}>
                  <label
                    htmlFor={type.Type_Name}
                    className="checkbox-container white"
                  >
                    {type.Type_Name}
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={type.Type_Name}
                      name="brand"
                      value={type.Type_Name}
                      onChange={(e) => {
                        handleTypeChange(e);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div className="filter-toggle white">
            <p className="white">In Stock Only</p>
            <label className="switch white" htmlFor="availability">
              <input
                type="checkbox"
                id="availability"
                name="in-stock"
                onChange={(e) => {
                  handleStockChange(e);
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <div className="filters-conditions white">
            <h4 className="filter-headers white">Location</h4>
            <div className="brand-select white">
              {locations.map((place) => (
                <React.Fragment key={place.Tool_Location}>
                  <label
                    htmlFor={place.Location_Name}
                    className="checkbox-container white"
                  >
                    {place.Location_Name}
                    <input
                      type="checkbox"
                      className="checkbox"
                      id={place.Location_Name}
                      name="brand"
                      value={place.Location_Name}
                      onChange={(e) => {
                        handleLocationChange(e);
                      }}
                    />
                    <span className="checkmark"></span>
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Filters;
