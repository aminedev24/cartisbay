import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';

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
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/slider/namibiaSlider.jpeg` , link : '#' },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/slider/congoSlider.jpeg`, link: '#' },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/slider/tanzaniaSlider.jpeg`, link: '#' },

  ];

  return (
    <section className="image-slider-section">
      <Slider {...settings}>
        {mediaItems.map((item, index) => (
          <div className="media-slide" key={index}>
            <Link to={item.link}>
            <img
              src={item.src}
              alt={`slide-${index}`}
              style={{ width: '100%', height: 'auto' }} // Adjust maxHeight as needed
            />
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MediaSlider;