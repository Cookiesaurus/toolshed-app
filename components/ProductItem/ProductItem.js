'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
const ProductItem = () => {
    const [product, setProduct] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const handleMinusClick = () => {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
      };
    
    const handlePlusClick = (maxStock) => {
        if (quantity < maxStock) {
          setQuantity(quantity + 1);
        }
      };

    useEffect(() => {
        fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => {
            setProduct(data.products);
            setQuantity(data.products[1].stock);
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
                <div className='product-quantity'>
                    <form className='quanity-form' onChange={null} method='get' onSubmit={(e) =>{e.preventDefault()}}>
                        <button type="submit" className='rent' id='add-to-cart'> Add to Cart </button>
                        <div className='plus-minus'>
                            <button onClick={handleMinusClick} className='minus'>-</button>
                                <input 
                                    id='quantity' 
                                    type='number'
                                    min='0' 
                                    max={productItem.stock} 
                                    value={quantity}
                                    onChange={(e) => setQuantity(parseInt(e.target.value, 10) || 0)}
                                />
                            <button className='plus' onClick={() => handlePlusClick(productItem.stock)}>+</button>
                        </div>
                    </form>
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
