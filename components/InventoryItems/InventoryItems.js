'use client'
import React from 'react'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
const InventoryItems = () => {
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
      <div className='inven-cont'>
        <div className='inven-items'>
            {product.slice(0, 24).map((productItem, index) => (
                <Link key={index} href={{
                pathname: '/inventory/product',
                query: {product_id: productItem.id} 
              }}  >
                <div className='inventory-item'>
                    <div className='inventory-image'>
                        {<Image src={productItem.images[0]} alt={'Product Place Holder'} width={230} height={280} className="popular-img"/>}
                    </div>
                    <div className="product-info">
                        <p>{productItem.title}</p>
                        <div className="item-aval">
                            <p className="stock-green">{productItem.stock} In Stock</p>
                            <p className="light-paragraph">Main Location</p>
                        </div>
                    </div>
                </div>
                </Link>
            ))}
        </div>
      </div>
    </>
  )
}

export default InventoryItems
