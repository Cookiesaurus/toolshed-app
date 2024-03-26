"use client";
import React from "react";
import { useState, useEffect } from "react";
import Image from "next/image";
const ProductItem = ({ tool }) => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.products);
            });
    }, []);

    // Stuff we need : Product image, Product Name, Product availability, Product brand, Product weight, Product location, Product description

    return (
        <>
            <div className="product-cont">
                <div className="product-left">
                    {tool && (
                        <div className="product-img" key={1}>
                            <Image
                                src={tool.Tool_Link}
                                alt={"Product Place Holder"}
                                width={230}
                                height={280}
                                className="product-img"
                                priority={true}
                            />
                        </div>
                    )}
                </div>
                <div className="product-right">
                    {tool && (
                        <React.Fragment>
                            <h2 className="product-title">{tool.Tool_Name}</h2>
                            <div className="item-avaliability">
                                <p className="pickup">Pickup</p>
                                <div className="availability">
                                    <p>{tool.Tool_Status_Details}</p>
                                    <p className="stock-green">Today</p>
                                </div>
                            </div>
                            <div className="replace-cont">
                                <p className="replacement">Replacement Cost:</p>
                                <p className="cost">
                                    ${tool.Tool_Replacement_Cost}
                                </p>
                            </div>
                            <div className="product-info">
                                <div className="info-left">
                                    <p className="product-info">
                                        Brand: {tool.Brand_Name}
                                    </p>
                                    <p className="product-info">
                                        Weight: {tool.Tool_Weight} lbs
                                    </p>
                                    <p className="product-info">
                                        Location: {tool.Location_Name}
                                    </p>
                                </div>
                            </div>
                            <div className="product-description">
                                <p>{tool.Category_Name}</p>
                            </div>
                        </React.Fragment>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductItem;
