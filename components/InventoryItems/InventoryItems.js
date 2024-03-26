"use client";
import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { set } from "zod";
const InventoryItems = () => {
    // Debug
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/api/tools")
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
            });
    }, []);
    return (
        <>
            <div className="inven-cont">
                <div className="inven-items">
                    {product.map((productItem, index) => {
                        return (
                            <Link
                                key={index}
                                href={{
                                    pathname: "/inventory/product",
                                    query: {
                                        product_id: productItem.Tool_ID,
                                    },
                                }}
                            >
                                <div className="inventory-item">
                                    <div className="inventory-image">
                                        {
                                            <Image
                                                src={productItem.Tool_Link}
                                                alt={"Product Place Holder"}
                                                width={230}
                                                height={280}
                                                className="popular-img"
                                            />
                                        }
                                    </div>
                                    <div className="product-info">
                                        <p>{productItem.Tool_Name}</p>
                                        <div className="item-aval">
                                            {productItem.Tool_Status_Details === "Available" ? (
                                                <p className="stock-green">{productItem.Tool_Status_Details}</p>
                                            ) : (
                                                <p className="stock-red">{productItem.Tool_Status_Details}</p>
                                            )}
                                            <p className="light-paragraph">
                                                {productItem.Location_Name}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default InventoryItems;
