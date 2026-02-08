import React from "react";
import { FaBox, FaCreditCard, FaUndo, FaHeadset } from "react-icons/fa";

const Features = () => {
  return (
    <section className="features">
      <div className="container-fluid">
        <div className="feature">
          <div className="icon-circle">
            <FaBox />
          </div>
          <div className="text">
            <h3>Free Shipping</h3>
            <p>You will love at great low prices</p>
          </div>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <FaCreditCard />
          </div>
          <div className="text">
            <h3>Flexible Payment</h3>
            <p>Pay with Multiple Credit Cards</p>
          </div>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <FaUndo />
          </div>
          <div className="text">
            <h3>14 Day Returns</h3>
            <p>Within 30 days for an exchange</p>
          </div>
        </div>

        <div className="feature">
          <div className="icon-circle">
            <FaHeadset />
          </div>
          <div className="text">
            <h3>Premium Support</h3>
            <p>Outstanding premium support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
