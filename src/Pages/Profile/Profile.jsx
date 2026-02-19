

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; 
import "./Profile.css";
import { FaEnvelope, FaPhoneAlt, FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Helper to construct image URL safely
  const getImgUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/150";
    if (imagePath.startsWith("http")) return imagePath; 
    return `https://e-commerce-backend-node-js-eyecore.vercel.app/${imagePath}`; 
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get("https://e-commerce-backend-node-js-eyecore.vercel.app/me", { withCredentials: true });
        setUser(userRes.data);
        const orderRes = await axios.get("https://e-commerce-backend-node-js-eyecore.vercel.app/api/orders/my-orders", { withCredentials: true });
        setOrders(orderRes.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoading(false);
        if (err.response && err.response.status === 401) {
          logout();
          navigate('/login');
        }
      }
    };
    fetchData();
  }, [logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleCardClick = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };

  const handleTrack = (e, orderId) => {
    e.stopPropagation(); 
    navigate(`/track-order/${orderId}`);
  };

  const handleCancel = async (e, orderId) => {
    e.stopPropagation(); 
    if (!window.confirm("Are you sure you want to cancel this order?")) return;

    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}/cancel`, 
        { status: "Cancelled" }, 
        { withCredentials: true }
      );
      setOrders((prevOrders) => 
        prevOrders.map((order) => 
          order._id === orderId ? { ...order, status: "Cancelled" } : order
        )
      );
      alert("Order cancelled successfully.");
    } catch (err) {
      console.error("Error cancelling order:", err);
    }
  };

  const getBadgeClass = (status) => {
    if (!status) return "processing";
    const lower = status.toLowerCase();
    if (lower.includes("cancelled")) return "cancelled"; 
    return lower; 
  };

  if (loading) return <div className="profile-loading">Loading profile...</div>;

  return (
    <div className="profile-wrapper">
      
      {/* HEADER */}
      <div className="profile-header-card">
        <div className="user-info-left">
          <div className="avatar-placeholder">
            {user?.name ? user.name.charAt(0).toUpperCase() : <FaUserCircle/>}
          </div>
          <div className="user-text">
            <h1 className="user-name">{user?.name || "User"}</h1>
            <p className="member-status">Eyecore Member</p>
          </div>
        </div>
        <div className="user-info-right">
          <div className="info-group"><FaEnvelope className="info-icon" /><span>{user?.email}</span></div>
          {user?.phone && <div className="info-group"><FaPhoneAlt className="info-icon" /><span>{user.phone}</span></div>}
          <button onClick={handleLogout} className="logout-btn-small">Log Out</button>
        </div>
      </div>

      {/* ORDER HISTORY */}
      <div className="profile-content">
        <h2 className="section-title">Order History</h2>

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/shop')} className="start-shopping-btn">Start Shopping</button>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order) => {
              // Check various statuses
              const statusLower = order.status.toLowerCase();
              const isCancelled = statusLower.includes("cancelled");
              const isShipped = statusLower.includes("shipped");
              const isDelivered = statusLower.includes("delivered");
              
              // Cancel is disabled if shipped, delivered, or already cancelled
              const isCancelDisabled = isShipped || isDelivered || isCancelled;

              return (
                <div 
                  key={order._id} 
                  className="order-card"
                  onClick={() => handleCardClick(order._id)}
                  style={{cursor: 'pointer'}} 
                >
                  <div className="card-top">
                    <span className="order-id">#{order._id.slice(-6).toUpperCase()}</span>
                    <span className={`status-badge ${getBadgeClass(order.status)}`}>{order.status}</span>
                  </div>

                  <div className="order-preview-images">
                     {order.items.slice(0, 3).map((item, idx) => (
                        <img 
                          key={idx} 
                          src={getImgUrl(item.image)} 
                          alt="preview" 
                          style={{width:'50px', height:'50px', objectFit:'cover'}}
                          onError={(e) => { e.target.style.display = 'none'; }} 
                        />
                     ))}
                     {order.items.length > 3 && (
                        <span style={{alignSelf:'center', color:'#888', fontSize:'0.8rem'}}>+{order.items.length - 3} more</span>
                     )}
                  </div>

                  <div className="card-details">
                    <p className="order-date">{new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
                    <p className="item-count">{order.items?.length || 0} Items</p>
                  </div>

                  <div className="card-bottom">
                    <span className="total-label">Total</span>
                    <span className="total-price">₹{order.totalAmount?.toLocaleString()}</span>
                  </div>

                  <div className="Contrl-btn">
                    
                    {/* HIDE TRACK BUTTON IF CANCELLED */}
                    {!isCancelled && (
                      <button className="btn-tr" onClick={(e) => handleTrack(e, order._id)}>
                        Track
                      </button>
                    )}

                    <button 
                      className="btn-cnl"
                      onClick={(e) => handleCancel(e, order._id)}
                      disabled={isCancelDisabled}
                    >
                      {/* Change Text based on status */}
                      {isCancelled ? "Order Cancelled" : "Cancel Order"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;