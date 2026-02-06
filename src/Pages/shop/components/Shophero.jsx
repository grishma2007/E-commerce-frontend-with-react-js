import React from 'react';

import shop1 from './../../../assets/images/shop1.jpg';

const ShopHero = () => {
  return (
    <section className="hero-split-wrapper">
        <div className="hero-text-side">
        <h1>Eyewear Crafted for Visionaries</h1>
        <p>
          Precision, elegance, and everyday luxury. Explore our new collection of 
          hand-polished acetate frames designed for the modern intellectual.
        </p>
      </div>    

      <div className="hero-image-side">
        <img 
          src={shop1}
          alt="Model wearing sunglasses" 
        />
      </div>
    </section>
  );
};

export default ShopHero;