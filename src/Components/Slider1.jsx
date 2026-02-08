import React from 'react';
import { Carousel } from 'antd';
import slider1 from '../assets/images/slider1.png';
import slider2 from '../assets/images/slider2.png';
import slider3 from '../assets/images/slider3.png';


const Slider1 = () => {
  const slideWrapper = {
    position: 'relative',
    width: '100%',
    height: '85vh', 
    overflow: 'hidden',
  };

  const imgStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover', 
    display: 'block',
  };

  const overlayTextStyle = {
     
    position: 'absolute',
    top: '50%',
    left: '20%',
    transform: 'translate(-50%, -50%)',
    padding: '0 10px',
    whiteSpace: 'normal', 
  };

  return (
    <Carousel autoplay>
      <div>
        <div style={slideWrapper}>
          <img src={slider1} alt="slider1" style={imgStyle} />
          <div style={overlayTextStyle}>
            <h1 className="slider-heading ">Eyewear<br/>for everyone</h1>
            <p className="slider-subtitle">
              Elevate your look with our curated collection of Eyewear
            </p>
            <div className="slider-btn">
              SHOP COLLECTION →
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={slideWrapper}>
          <img src={slider2} alt="slider2" style={imgStyle} />
          <div style={overlayTextStyle}>
            <h1 className="slider-heading ">Eye-catching<br/> Elegance</h1>
            <p className="slider-subtitle">
              Discover the allure of our fashionable glasses
            </p>
            <div className="slider-btn">
              SHOP COLLECTION →
            </div>
          </div>
        </div>
      </div>
      <div>
        <div style={slideWrapper}>
          <img src={slider3} alt="slider3" style={imgStyle} />
          <div style={overlayTextStyle}>
            <h1 className="slider-heading ">Style Speaks<br/>Louder</h1>
            <p className="slider-subtitle">
              Step into the world of clarity and shopistication
            </p>
            <div className="slider-btn">
              SHOP COLLECTION →
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Slider1;
