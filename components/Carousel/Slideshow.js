"use client";

import Image from "next/image";
import "./slideshow.css";
import { useState, useEffect } from "react";

const SlideShow = ({ data }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? data.length - 1 : slide - 1);
  };



  return (
    <>
      <div className="carousel">
        <a className="arrow arrow-left" onClick={prevSlide}>
          ❮
        </a>
        {data.map((img, i) => (
          <Image
            key={i} // Use a unique key, for example, the array index
            src={img.src}
            alt={img.alt}
             width={900}
             height={400}
            className={slide === i ? "slide" : "slide slide-hidden"}
            priority={true}
          />
        ))}
        <a className="arrow arrow-right" onClick={nextSlide}>
          ❯
        </a>
        <span className="indicators">
          {data.map((_, i) => (
            <button
              key={i} // Use a unique key, for example, the array index
              onClick={() => setSlide(i)}
              className={
                slide === i ? "indicator" : "indicator indiactor-inactive"
              }
            ></button>
          ))}
        </span>
      </div>
    </>
  );
};

export default SlideShow;
