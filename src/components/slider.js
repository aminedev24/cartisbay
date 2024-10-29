import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const MediaSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    fade: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    pauseOnFocus: false,
  };

  const mediaItems = [
    { type: 'video', src: `${process.env.PUBLIC_URL}/vids/hero.mp4` },
    { type: 'video', src: `${process.env.PUBLIC_URL}/vids/car-dismantling.mp4` },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/used-tires-banner.jpg` },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/dismantling-banner.jpg` },
  ];

  const videoRefs = useRef([]);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch((error) => console.log('Error playing video:', error));
      }
    });
  }, [mediaItems]);

  return (
    
    <section className="video-slider-section">
      <Slider {...settings}>
        {mediaItems.map((item, index) => (
          <div className="media-slide" key={index}>
            {item.type === 'video' ? (
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                src={item.src}
                loop
                muted
                disablePictureInPicture
                playsInline
                tabIndex="-1"
                style={{ width: '100%', height: 'auto' }}
                onLoadedData={() => {
                  videoRefs.current[index] && videoRefs.current[index].play();
                }}
              />
            ) : (
              <img
                src={item.src}
                alt={`slide-${index}`}
                style={{ width: '100%', height: 'auto' }}
              />
            )}
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default MediaSlider;
