'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShop, faRotate, faFileLines } from '@fortawesome/free-solid-svg-icons';
const ProductItem = () => {
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

    useEffect(()=>{
        console.log(
            product.map((productItem, index) => (
                productItem
            ))
        )
    })

  return (
    <>
    <div className='product-cont'>
        <div className='product-left'>
            {product.slice(0, 1).map((productItem, index) => (
                <div className='product-img' key={index}>
                    {<Image src={productItem.thumbnail} alt={'Product Place Holder'} width={230} height={280} className="product-img" priority={true}/>}
                </div>
            ))}
        </div>
        <div className='product-right'>
                {product.slice(0, 1).map((productItem, index)=>{
                        <h2 key={index}>{productItem.title}</h2>
                })}
                <div className='product-quantity'>
                    <form className='quanity-form' onChange={null}>
                        <select name="quantity" id="quantity">
                            {/* {options} */}
                        </select>
                        <br/><br/>
                        <button type="submit" className='rent'> Rent </button>
                    </form>
                </div>
                <div className='product-info'>
                    <div className='info-left'>
                        <p><FontAwesomeIcon icon={faShop} style={{color: '#6C757D', marginRight: '10px'}}/>Location: </p>
                        <p><FontAwesomeIcon icon={faFileLines} style={{color: '#6C757D', marginRight: '14px'}}/>Condition: </p>
                        <p><FontAwesomeIcon icon={faRotate} style={{color: '#6C757D', marginRight: '10px'}}/>Return Info: </p>
                    </div>
                    <div className='info-right'>
                        <p className='sub-info'>Main Location </p>
                        <p className='sub-info'> Info</p>
                        <p className='sub-info'> Info</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ProductItem
