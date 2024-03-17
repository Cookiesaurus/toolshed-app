'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
const ProductItem = () => {
    const [product, setProduct] = useState([]);

    useEffect(() => {
        fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
            setProduct(data.products);
        });
    }, []);


  return (
    <>
    <div className='product-cont'>
        <div className='product-left'>
            {product.length >= 2 && (
                <div className='product-img' key={1}>
                    <Image src={product[1].images[0]} alt={'Product Place Holder'} width={230} height={280} className="product-img" priority={true}/>
                </div>
            )}
        </div>
        <div className='product-right'>
            {product.slice(1, 2).map((productItem, index) => (
                <React.Fragment key= {index}>
                <h2 className='product-title'>{productItem.title}</h2>
                <div className='item-avaliability'>
                    <p className='pickup'>Pickup</p>
                    <div className='availability'>
                        <p>Ready</p>
                        <p className='stock-green'>Today</p>
                    </div>
                </div>
                <div className='replace-cont'>
                        <p className='replacement'>Replacement Cost:</p>
                        <p className='cost'>${productItem.price}.99</p>
                </div>
                <div className='product-info'>
                    <div className='info-left'>
                        <p className='product-info'>Brand: {productItem.brand}</p>
                        <p className='product-info'>Weight: {productItem.rating} lbs</p>
                        <p className='product-info'>Location: Main Location</p>
                    </div>
                </div>
                <div className='product-description'>
                    <p>{productItem.description}</p>
                </div>
                </React.Fragment>
            ))}
            </div>
        </div>
    </>
  )
}

export default ProductItem
