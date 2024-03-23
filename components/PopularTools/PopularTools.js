'use client'
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import './product.css'

const PopularTools = ({tools}) => {

  const [imgeUrl, setImageURL] = useState([])

 console.log(tools)
 useEffect(() => {
  // Create image URLs from base64-encoded data
  const urls = tools.map(tool => {
    const base64Data = tool.Tool_Image.data;
    const binaryData = Buffer.from(base64Data, 'base64');
    return 'data:image/jpg;base64,'+binaryData;
  });
  setImageURL(urls);
}, [tools]);

  return (
    <>
      <h2> Popular Tools</h2>
        <div className="popular-container">
        {tools.map((tool, index) => (
            <div className="popular" key={tool.Tool_ID}>
            <Link href={{
                pathname: '/inventory/product',
                query: {product_id: tool.Tool_ID} 
              }}  >
            <div className="img-cont">
              <img src={imgeUrl[index]} />
            </div>
                <p className="product-title">{tool.Tool_Name}</p>
                <div className="popular-info">
                    <p className="stock-green">{tool.Tool_Status_Details}</p>
                    <p className="light-paragraph">{tool.Location_Name}</p>
                </div>
                </Link>
            </div>
        ))}
        </div>
      <div className="button-center">
        <button type="submit" tabIndex={-1}>
          {" "}
          <Link href={"/inventory"} className="home-button">
            View All Tools
          </Link>
        </button>
      </div>
    </>
  );
};

export default PopularTools;
