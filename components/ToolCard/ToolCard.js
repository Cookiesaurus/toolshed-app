"use client";
import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

const ToolCard = ({ tools }) => {
    // Debug
    return (
        <>
            <div className="inven-cont">
                <div className="inven-items">
                    {tools &&
                        tools.map((productItem, index) => {
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
                                                <p className="stock-green">
                                                    {
                                                        productItem.Tool_Status_Details
                                                    }{" "}
                                                </p>
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
export default ToolCard;
