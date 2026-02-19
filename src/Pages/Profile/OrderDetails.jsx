import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaBoxOpen, FaTruck, FaMapMarkerAlt, FaExchangeAlt, FaTimesCircle } from "react-icons/fa";
import "./OrderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImgUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath; 
    return `https://e-commerce-backend-node-js-eyecore.vercel.app/${imagePath}`; 
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await axios.get(`https://e-commerce-backend-node-js-eyecore.vercel.app/api/orders/${orderId}`, {
          withCredentials: true,
        });
        setOrder(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching order details:", err);
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  // --- Handlers ---
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this entire order?")) return;
    try {
      await axios.put(`https://e-commerce-backend-node-js-eyecore.vercel.app/api/orders/${orderId}/cancel`, 
        { status: "Cancelled" }, 
        { withCredentials: true }
      );
      setOrder(prev => ({ ...prev, status: "Cancelled" }));
      alert("Order cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling order:", err);
      alert("Failed to cancel order.");
    }
  };

  const handleExchange = async () => {
    if (!window.confirm("Do you want to request an exchange for this order?")) return;
    try {
      await axios.put(`https://e-commerce-backend-node-js-eyecore.vercel.app/api/orders/${orderId}/update-status`, 
        { status: "Exchange Requested" }, 
        { withCredentials: true }
      );
      setOrder(prev => ({ ...prev, status: "Exchange Requested" }));
      alert("Exchange request submitted.");
    } catch (err) {
      console.error("Error requesting exchange:", err);
      alert("Failed to request exchange.");
    }
  };

  if (loading) return <div className="details-loading">Loading details...</div>;
  if (!order) return <div className="details-error">Order not found.</div>;

  // --- Logic ---
  const statusLower = order.status.toLowerCase();
  const isCancelled = statusLower.includes("cancelled");
  const isDelivered = statusLower.includes("delivered");
  const isShipped = statusLower.includes("shipped");
  const isExchangeRequested = statusLower.includes("exchange");

  const showCancel = !isShipped && !isDelivered && !isCancelled && !isExchangeRequested;
  const showExchange = isDelivered && !isCancelled && !isExchangeRequested;

  // Dates
  const orderDate = new Date(order.createdAt);
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 7);

  return (
    <div className="order-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <FaArrowLeft /> Back to Orders
      </button>

      <div className="details-header">
        <div className="header-text">
          <h1 className="details-title">Order Details</h1>
          <p className="details-subtitle">Order #{order._id.slice(-6).toUpperCase()}</p>
        </div>
        <div className={`details-status-badge ${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
          {order.status}
        </div>
      </div>

      <div className="details-grid">
        
        {/* --- LEFT COLUMN: ITEMS + TOTAL + BUTTONS --- */}
        <div className="details-left">
          <div className="details-card main-card">
            <h3><FaBoxOpen className="card-icon"/> Items in your order</h3>
            
            {/* 1. SCROLLABLE ITEM LIST */}
            <div className="scrollable-items-list">
              {order.items.map((item, index) => (
                <div key={index} className="order-item-row">
                  <div className="item-img-wrapper">
                    <img 
                      src={getImgUrl(item.image)} 
                      alt={item.name} 
                      className="item-thumb" 
                      onError={(e) => { e.target.src = "https://via.placeholder.com/80?text=No+Img"; }}
                    />
                  </div>
                  <div className="item-info">
                    <h4>{item.name}</h4>
                    <p>Qty: {item.quantity}</p>
                  </div>
                  <div className="item-price">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* 2. PAYMENT SUMMARY (Inside the same card, below items) */}
            <div className="summary-section">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-divider"></div>
              <div className="summary-row total">
                <span>Total</span>
                <span>₹{order.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* 3. ACTION BUTTONS (Inside the same card, below total) */}
            {(showCancel || showExchange) && (
              <div className="actions-section">
                {showCancel && (
                  <button className="action-btn cancel-btn" onClick={handleCancel}>
                    <FaTimesCircle /> Cancel Order
                  </button>
                )}
                {showExchange && (
                  <button className="action-btn exchange-btn" onClick={handleExchange}>
                    <FaExchangeAlt /> Return / Exchange
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* --- RIGHT COLUMN: INFO ONLY --- */}
        <div className="details-right">
          <div className="details-card">
            <h3><FaMapMarkerAlt className="card-icon"/> Shipping Details</h3>
            <div className="card-content">
              <p className="strong-text">{order.shippingAddress?.fullName || "User"}</p>
              <p>{order.shippingAddress?.address}</p>
              <p>{order.shippingAddress?.city}, {order.shippingAddress?.postalCode}</p>
              <p className="phone-text">Phone: {order.shippingAddress?.phone || "N/A"}</p>
            </div>
          </div>

          <div className="details-card">
            <h3><FaTruck className="card-icon"/> Delivery Status</h3>
            <div className="card-content">
              <div className="timeline-row">
                <span>Order Placed:</span>
                <span>{orderDate.toLocaleDateString()}</span>
              </div>
              {!isCancelled ? (
                <div className="timeline-row highlight">
                  <span>Expected Delivery:</span>
                  <span>{deliveryDate.toLocaleDateString()}</span>
                </div>
              ) : (
                <div className="timeline-row cancelled-text">
                  <span>Status:</span>
                  <span>Order Cancelled</span>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderDetails;