"use client";

import Image from "next/image";
import "./slideshow.css";
import { useState, useEffect } from "react";

const SlideShow = ({ data }) => {
  const [imageUrl, setImageUrl] = useState([]);
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === imageUrl.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? imageUrl.length - 1 : slide - 1);
  };


  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const response = await fetch('https://api.unsplash.com/photos/random?client_id=BEW5DhPRasEi-LC7snykBXPKrkBVaTPOCM-p1cU_qnE&orientation=landscape&count=5');
        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const data = await response.json();
        setImageUrl(data);
      } catch (error) {
        console.error('Error fetching random image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  useEffect(() => {
    // Set up interval to change slide every 5 seconds (adjust as needed)
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000);

    // Cleanup the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [slide]);



  return (
    <>
      <div className="carousel">
        {imageUrl.map((img, i) => (
          <Image
            key={i} // Use a unique key, for example, the array index
            src={img.urls.regular}
            alt={img.alt_description}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '400px'
            }}
            width={500}
            height={300}
            className={slide === i ? "slide" : "slide slide-hidden"}
            priority={true}
          />
        ))}
        <span className="indicators">
          {imageUrl.map((_, i) => (
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
