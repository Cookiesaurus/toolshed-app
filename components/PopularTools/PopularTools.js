'use client'
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import './product.css'

const PopularTools = () => {


    const [product, setProduct] = useState([]);
    const [productImg, setProductImage] = useState([])
    useEffect(() => {
        fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
            setProduct(data.products);
            setProductImage(data.images);
        });
    }, []);


  return (
    <>
      <h2> Popular Tools</h2>
        <div className="popular-container">
        {product.slice(0, 5).map((productItem, index) => (
            <div className="popular" key={index}>
            <Link href={{
                pathname: '/inventory/product',
                query: {product_id: productItem.id} 
              }}  >
            <div className="img-cont">
              {<Image src={productItem.images[0]} alt={'Product Place Holder'} width={230} height={280} className="popular-img"/>}
            </div>
                <p className="product-title">{productItem.title}</p>
                <div className="popular-info">
                    <p className="stock-green">{productItem.stock} In Stock</p>
                    <p className="light-paragraph">Main Location</p>
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
