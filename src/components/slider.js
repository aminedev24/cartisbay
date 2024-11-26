import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  const mediaItems = [
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/homepage/slider/used-tires-banner-comp.jpg` },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/homepage/slider/dismantling-banner-comp.jpg` },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/homepage/slider/paypalbannerclick.jpeg` }
  ];

  return (
    <section className="image-slider-section">
      <Slider {...settings}>
        {mediaItems.map((item, index) => (
          <div className="media-slide" key={index}>
            <img
              src={item.src}
              alt={`slide-${index}`}
              style={{ width: '100%', height: 'auto' }} // Adjust maxHeight as needed
            />
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MediaSlider;