import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from 'react-router-dom';
import '../css/slider.css'
import { useUser } from "./userContext"; // Import useUser  hook

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

  const { user, logout } = useUser(); // Access user and logout from context
  

  const mediaItems = [
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/slider/namibiaSlider2.jpeg` , link : '#' },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/slider/congoSlider2.jpeg`, link: '#' },
    { type: 'image', src: `${process.env.PUBLIC_URL}/images/slider/tanzaniaSlider2.jpeg`, link: '#' },

  ];

  return (
    <div className="slider-container">
    <div className="slider">
      <Slider {...settings}>
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/slider/namibiaSlider2.jpeg`} alt="Slide 1" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/slider/congoSlider2.jpeg`} alt="Slide 2" />
        </div>
        <div>
          <img src={`${process.env.PUBLIC_URL}/images/slider/tanzaniaSlider2.jpeg`} alt="Slide 3" />
        </div>
      </Slider>
    </div>
    <div className="right-image register-banner">
      {!user ? (
        <>
        <div className="register-banner">
          <img src={`${process.env.PUBLIC_URL}/images/homepage/register0.png`} />
          <Link to='/login'><button className="sign-in-btn">sign in</button></Link>
          <Link to='register'><button className="register-btn">register</button></Link>
        </div>   
        </>
      ) : (
        <>
        <div className="welcome-banner">
          
          <h2>welcome {`${user.name}`}</h2>
          <img src={`${process.env.PUBLIC_URL}/images/homepage/register1.png`} />
          <Link to='/contact'><button className="contact-btn">contact</button></Link>
          <Link to='/profile'><button className="profile-btn">profile</button></Link>
        </div>
          
        </>
      )}    
  </div>
  </div>
  );
};

export default MediaSlider;