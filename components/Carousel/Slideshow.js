'use client'

import Image from "next/image";
import './slideshow.css';
import { useState } from "react";

const SlideShow = () => {

  const [slideIndex, setSlideIndex] = useState(1);

  const plusSlides = (n) => {
    showSlides(slideIndex + n);
  };

  const currentSlide = (n) => {
    showSlides(n);
  };

  const showSlides = (n) => {
    let i;
    const slides = document.getElementsByClassName("slideshow-image");
    const dots = document.getElementsByClassName("dot");

    if (n > slides.length) {
      setSlideIndex(1);
    }
    
    if (n < 1) {
      setSlideIndex(slides.length);
    }

    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }

    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setSlideIndex(n);
  };


  return (
  <>
    <div className="slideshow-container">
      <div className="slideshow-image">
        
      </div>
        <a className="prev" >&#10094;</a>
        <a className="next" >&#10095;</a>
    </div>
    <br/>
    <div className="slideshow-dots">
      <span className="dot" ></span>
      <span className="dot" ></span>
      <span className="dot" ></span>
    </div>
  </>  
  )
}

export default SlideShow
