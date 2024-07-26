import React, { useState, useEffect } from 'react';
import './Slider.css';

const Slider = () => {
  const images = [
    {
      url: 'https://images.macrumors.com/article-new/2023/09/iPhone-15-General-Feature-Black.jpg'
    },
    {
      url: 'https://cdn.mos.cms.futurecdn.net/h7RghmVhRSKgsqSpRCgiL-1200-80.jpg'
    },
    {
      url: 'https://static.independent.co.uk/2024/04/10/09/kids%20headphones%20p.png?width=1200&height=630&fit=crop'
    },
    {
      url: 'https://images.macrumors.com/article-new/2023/09/iPhone-15-General-Feature-Black.jpg'
    },
    {
      url: 'https://i.ytimg.com/vi/ql6mhhHCldY/maxresdefault.jpg'
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      <div
        className="images"
        style={{ backgroundImage: `url(${images[currentIndex].url})` }}
      ></div>
    </div>
  );
};

export default Slider;
