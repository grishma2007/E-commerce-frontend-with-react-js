import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './checkout.css'; 
import { useCart } from '../../Context/CartContext'; 

// -------------------------------------------------------------------------------
const loadRazorpay = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};
// -----------------------------------------------------------------------------
// main 
// --------------------------------------------------------------------------------
const Checkout = () => {

  const { 
    cart: cartItems, 
    cartTotal, 
    removeFromCart, 
    updateQuantity, 
    clearCart 
  } = useCart();

  const navigate = useNavigate();
  const subtotal = cartTotal || 0;
  const shipping = 0; 
  const total = subtotal + shipping;

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    email: '',
    country: 'India',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    saveInfo: false
  });

  // ----------------------------------------------------------------------------------
  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    const numericString = String(price).replace(/[^0-9.]/g, '');
    return parseFloat(numericString) || 0;
  };
 
  // ----------------------------------------------------------------------------------
  const checkLogin = async () => {
    const res = await fetch("http://localhost:5000/info", {
      method: "GET",
      credentials: "include",
    });

    return res.status !== 401;
  };
  // ----------------------------------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  // ----------------------------------------------------------------------------------
  const placeOrder = async (method, razorpayPayment = null) => 
  {
    const res = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customer: formData,
        items: cartItems,
        totalAmount: total,
        paymentMethod: method,
        razorpayPayment, // ✅ FIX
      }),
    });
    if (res.status === 401) {
      alert("Please login first");
      navigate("/login");
      return;
    }
    return res.json();
  };
  // ---------------------------------------------------------------------------------------------
  const handleRazorpayPayment = async () => 
    {
      const loaded = await loadRazorpay();
      if (!loaded) {
        alert("Razorpay SDK failed to load");
        return;
      }
    
      try 
      {
        const res = await fetch
        ("http://localhost:5000/api/payment/create-order",
          {
            method: "POST",
    credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: total }),
          }
        );
      
        const data = await res.json();
        const options = 
        {
          key: "rzp_test_SBa7cZ8R6v5nw7",
          amount: data.order.amount,
          currency: "INR",
          name: "EYECORE",
          description: "Order Payment",
          order_id: data.order.id,
          handler: async function (response) 
          {
            const verifyRes = await fetch( "http://localhost:5000/api/payment/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              });
    
            const verifyData = await verifyRes.json();
            if (!verifyData.success) {
              alert("Payment verification failed");
              return;
            }

            await placeOrder("razorpay", {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            });

            clearCart(); 
            navigate("/");
            },
            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              contact: "9999999999",
            },
            theme: {
              color: "#000",
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();

      } catch (err) 
        {
          console.error(err);
          alert("Payment failed");
        }
  };
  // ---------------------------------------------------------------------------------------
  const handleSubmit = async (e) => 
  {
    e.preventDefault();
    try {
       const isLoggedIn = await checkLogin();
        if (!isLoggedIn) {
          alert("Please login first");
          navigate("/login");
          return;
        }
        else{
          if (paymentMethod === "cod") {
          await placeOrder("cod");
          clearCart();
          alert("Order placed successfully!");
          navigate("/");
      } else {
        handleRazorpayPayment();
      }
    }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the order.");
    }
  };
// -----------------------------------------------------------------------------------
return (
    <div className="checkout-wrapper">
      
      {/* HEADER */}
      <header className="coach-header">
        <h1 className="brand-logo">EYECORE</h1>
      </header>

      {/* MAIN CONTENT */}
      <div className="checkout-layout">
        
        {/* LEFT COLUMN: FORM */}
        <div className="checkout-form-container">
          
          <div className="nav-header">
            <button className="round-back-btn" onClick={() => navigate(-1)} aria-label="Go back">
              &#8592;
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <section className="form-group-section">
              <div className="section-head-row">
                <h3>Contact</h3>
                <a href="/login" className="login-link">Log in</a>
              </div>
              <input type="text" name="email" placeholder="Email" className="input-field" onChange={handleChange} required />
              <label className="checkbox-row">
                <input type="checkbox" name="saveInfo" />
                <span>Email me with news and offers</span>
              </label>
            </section>

            <section className="form-group-section">
              <h3>Delivery</h3>
              <select name="country" className="input-field" onChange={handleChange} value={formData.country}>
                <option value="India">India</option>
                <option value="USA">United States</option>
              </select>

              <div className="two-col-row">
                <input type="text" name="firstName" placeholder="First name" className="input-field" onChange={handleChange} required />
                <input type="text" name="lastName" placeholder="Last name" className="input-field" required onChange={handleChange} />
              </div>

              <input type="text" name="address" placeholder="Address" className="input-field" required onChange={handleChange}  />
              <input type="text" name="apartment" placeholder="Apartment (optional)" className="input-field" onChange={handleChange} />

              <div className="two-col-row">
                <input type="text" name="city" placeholder="City" className="input-field" required onChange={handleChange} />
                <input type="text" name="postalCode" placeholder="Postal code" className="input-field" onChange={handleChange} />
              </div>
            </section>

            <section className="form-group-section">
              <h3>Shipping method</h3>
              <div className="shipping-option">
                <span>Standard Shipping</span>
                <span className="price-tag">Free</span>
              </div>
            </section>

            <section className="form-group-section">
              <h3>Payment</h3>
              <p className="secure-notice">All transactions are secure and encrypted.</p>
              <div className="payment-accordion">
                {/* Card Option */}
                <div className={`payment-item ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <div className="payment-header" onClick={() => setPaymentMethod('card')}>
                    <div className="radio-group">
                      <input type="radio" name="payment" checked={paymentMethod === 'card'} readOnly />
                      <span>Credit/Debit Card</span>
                    </div>
                    <span>💳</span>
                  </div>
               {paymentMethod === 'card' && (
  <div className="payment-body gray-bg">
    <p>Secure payment powered by Razorpay</p>
  </div>
)}
                </div>

                {/* COD Option */}
                <div className={`payment-item ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <div className="payment-header" onClick={() => setPaymentMethod('cod')}>
                    <div className="radio-group">
                      <input type="radio" name="payment" checked={paymentMethod === 'cod'} readOnly />
                      <span>Cash on Delivery (COD)</span>
                    </div>
                  </div>
                  {paymentMethod === 'cod' && (
                    <div className="payment-body gray-bg">
                      <p>Pay safely with cash upon delivery.</p>
                    </div>
                  )}
                </div>
              </div>
            </section>
            <button type="submit" className="pay-btn">Place Order</button>
          </form>
        </div>

        <div className="checkout-summary-sidebar">
          <div className="sticky-content">
            <h2 className="summary-title">Order Summary</h2>
            <div className="cart-list">
              {cartItems.map((item) => {
                const itemPrice = parsePrice(item.price);
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div key={item.id} className="cart-item">
                    <div className="img-wrap">
                      <img src={item.image || 'https://via.placeholder.com/60'} alt={item.name} />
                      <span className="qty-badge">{item.quantity}</span>
                    </div>

                    <div className="item-details">
                      <div className="details-top">
                        <p className="item-name">{item.name}</p>
                        <p className="item-price">₹{itemTotal.toLocaleString()}</p>
                      </div>
                      <p className="item-variant">Black / Standard</p>

                      <div className="item-controls-row">
                        <div className="qty-wrapper-small">
                          <button type="button" onClick={() => updateQuantity(item.id, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, 1)}>+</button>
                        </div>

                        <button 
                          type="button" 
                          className="delete-item-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>

            <div className="totals-box">
              <div className="total-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="total-row final">
                <span>Total</span>
                <span className="grand-total">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <footer className="checkout-footer">
        <div className="footer-content">
          <p>© 2026 Eyecore. All rights reserved.</p>
          <div className="footer-links">
             <a href="#">Privacy Policy</a>
             <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Checkout;  