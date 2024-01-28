'use client'

import Link from 'next/link';
import './catoverlay.css';
import { useState } from 'react';

const CatOverlay = () => {
    const testCat = [];

    for (let i = 0; i < 16; i++) {
      testCat.push(<p className="category-item" key={i}>Category</p>);
    }

    const testBrands = [];

    const gridSize = 3;

    for (let i = 0; i < gridSize * gridSize; i++) {
        const row = Math.floor(i / gridSize);
        const col = i % gridSize;
        testBrands.push(<div key={i} className="brand-item">
            <p>Brand Name</p>
            <p className='model-name'>Model Name</p>
            <p className='model-name'>Model Name</p>
            <p className='model-name'>Model Name</p>
        </div>);
    }


    return (
        <>
            <div className='category-dropdown'>
                <div className='categories-container'>
                    <div className='left-category'>
                    <p>Popular</p>
                    {testCat}
                    </div>
                    <div className='right-category'>
                       {testBrands}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CatOverlay