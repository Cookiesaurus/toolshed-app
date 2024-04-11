"use client";

import { useState, useEffect } from "react";

const SlideShow = ({ imageUrls }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const nextSlide = () => {
    setSlideIndex((slideIndex + 1) % imageUrls.length);
  };

  const prevSlide = () => {
    setSlideIndex((slideIndex - 1 + imageUrls.length) % imageUrls.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [slideIndex, imageUrls.length]); // Added slideIndex and imageUrls.length as dependencies

  return (
    <div className="carousel">
      {imageUrls.map((imageUrl, index) => (
        <img
          key={index}
          src={imageUrl}
          alt={`Slide ${index}`}
          className={slideIndex === index ? "slide" : "slide slide-hidden"}
        />
      ))}
      <span className="indicators">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => setSlideIndex(index)}
            className={slideIndex === index ? "indicator" : "indicator indicator-inactive"}
          ></button>
        ))}
      </span>
    </div>
  );
};

export default SlideShow;