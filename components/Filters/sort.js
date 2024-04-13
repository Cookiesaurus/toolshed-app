"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
const Sort = () => {
    const [selectedSort, setSelectedSort] = useState([]);

     //Constructors to update URL Params
  const router = useRouter();
  const searchParams = useSearchParams();
  const filterParams = new URLSearchParams(searchParams);

  //****ON CHANGE EVENT HANDLERS**** */
  const handleSortChange = (event) => {
    const selectedOption = event.target.value;
    setSelectedSort([selectedOption]); // Only set the selected value, overriding previous selections
  
    UpdateURLParams({ sort: selectedOption }); // Update URL param with the selected value
  };
  
  const UpdateURLParams = (params) => {
    const filterParams = new URLSearchParams();
  
    for (const [key, value] of Object.entries(params)) {
      filterParams.set(key, value);
    }
    router.push(`/inventory` + `?` + filterParams.toString());
  };
  return (
    <>
      <div className="sort">
        <select id="filter-sort" defaultValue={"sort-by"} onChange={(e) => {
                      handleSortChange(e);
                    }}>
          <option value="sort-by" hidden>Sort By:</option>
          <option value="popular">Popular</option>
          <option value="featured">Featured</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>
    </>
  );
};

export default Sort;
