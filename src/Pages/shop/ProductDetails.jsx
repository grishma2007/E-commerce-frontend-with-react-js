
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
// 1. Added FaHeart and FaRegHeart to imports
import { FaStar, FaMinus, FaPlus, FaTimes, FaArrowLeft, FaHeart, FaRegHeart } from "react-icons/fa"; 
import { TbTruckDelivery, TbRotateClockwise } from "react-icons/tb";
import "./shop.css"; 
import { useCart } from "../../Context/CartContext"; 
// 2. Added Wishlist Context import
import { useWishlist } from "../../Context/WishlistContext"; 

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart(); 
  
  // 3. Initialize Wishlist Hook
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newReview, setNewReview] = useState({ user: "", rating: 0, text: "" });

  useEffect(() => {
    window.scrollTo(0, 0); 
    axios
      .get(`http://localhost:5000/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/reviews/${id}`)
      .then((res) => setReviews(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec" && quantity > 1) setQuantity(quantity - 1);
    if (type === "inc") setQuantity(quantity + 1);
  };

  const handleInputChange = (e) => {
    setNewReview({ ...newReview, [e.target.name]: e.target.value });
  };

  const handleRatingClick = (ratingValue) => {
    setNewReview({ ...newReview, rating: ratingValue });
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!newReview.user || !newReview.rating || !newReview.text) {
      alert("All fields required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/reviews",
        {
          productId: id,
          user: newReview.user,
          rating: newReview.rating,
          text: newReview.text,
        },
        { withCredentials: true }
      );
      setReviews([res.data, ...reviews]);
      setNewReview({ user: "", rating: 0, text: "" });
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1) 
    : 0;
  
  const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 3);

  const handleAddToCart = () => {
    const itemToAdd = {
      ...product,
      image: `http://localhost:5000/${product.image}`
    };
    addToCart(itemToAdd);
  };

  if (loading) return <div style={{padding: "100px", textAlign: "center"}}>Loading...</div>;
  if (!product) return <div style={{padding: "100px", textAlign: "center"}}>Product not found</div>;

  return (
      <>
      <div className="pdp-container container-fluid">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <FaArrowLeft /> Back
      </button>

      <div className="pdp-wrapper">
        <div className="pdp-image-section">
          <div className="main-image-box">
            <img 
              src={`http://localhost:5000/${product.image}`} 
              alt={product.name} 
              onError={(e) => { e.target.src = "https://via.placeholder.com/500"; }}
            />
          </div>
        </div>

        <div className="pdp-info-section">
          <p className="breadcrumb">Home / Shop / {product.name}</p>
          <h1 className="pdp-title">{product.name}</h1>
          <div className="pdp-price-row">
            <span className="current-price">₹{product.price}</span>
            <div className="pdp-rating">
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.round(averageRating) ? "#FFB800" : "#ddd"} />
                ))}
                <span>({reviews.length} Reviews)</span>
            </div>
          </div>
          <p className="pdp-description">
             Experience premium clarity and style with the {product.name}. 
             Designed for the modern minimalist.
          </p>
          <div className="pdp-actions">
            
            <div className="quantity-selector">
              <button onClick={() => handleQuantity("dec")}><FaMinus size={10}/></button>
              <span>{quantity}</span>
              <button onClick={() => handleQuantity("inc")}><FaPlus size={10}/></button>
            </div>
            <button 
                className="wishlist-pdp-btn"
                onClick={() => toggleWishlist(product)}
                title={isInWishlist(product._id || product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                style={{
                    
                    background: "white",
                    border: "1px solid #ddd",
                    width: "55px",
                    height: "55px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    
                    cursor: "pointer",
                    fontSize: "1.2rem",
                    transition: "all 0.2s ease"
                }}
            >
                {isInWishlist(product._id || product.id) ? <FaHeart color="#ff4444" /> : <FaRegHeart color="#111"/>}
            </button>
 
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
                ADD TO CART
            </button>

            {/* 4. NEW: Wishlist Button */}
           
          </div>
          <div className="pdp-extras">
            <div className="extra-item">
                <TbTruckDelivery size={20}/>
                <span>Free Shipping over ₹2000</span>
            </div>
            <div className="extra-item">
                <TbRotateClockwise size={20}/>
                <span>30-day return policy</span>
            </div>
          </div>
        </div>
      </div>


      <div className="review-section-container">
        <div className="review-section-header">
            <h3 className="section-title">Customer Reviews</h3>
            <button className="open-modal-btn" onClick={() => setIsModalOpen(true)}>
                Write a Review
            </button>
        </div>
        <div className="reviews-display-list">
            {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to review!</p>
            ) : (
                displayedReviews.map((review) => (
                    <div key={review.id} className="review-card">
                        <div className="review-header">
                            <span className="r-user">{review.user}</span>
                            <span className="r-date">{review.date}</span>
                        </div>
                        <div className="r-stars">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} color={i < review.rating ? "#1a1a1a" : "#ddd"} size={14}/>
                            ))}
                        </div>
                        <p className="r-text">{review.text}</p>
                    </div>
                ))
            )}
        </div>
        {reviews.length > 3 && (
            <div className="see-all-wrapper">
                <button 
                    className="see-all-btn" 
                    onClick={() => setShowAllReviews(!showAllReviews)}
                >
                    {showAllReviews ? "Show Less" : "See All Reviews"}
                </button>
            </div>
        )}
      </div>

  
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-modal-btn" onClick={() => setIsModalOpen(false)}>
                <FaTimes />
            </button>
            <h4>Write a Review</h4>
            <p className="modal-subtitle">Share your thoughts on the {product.name}</p>
            <form onSubmit={handleSubmitReview}>
                <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" name="user" value={newReview.user} onChange={handleInputChange} placeholder="Enter your name" required />
                </div>
                <div className="form-group">
                    <label>Rating</label>
                    <div className="star-input-wrapper">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar key={star} size={28} className="star-pointer" color={star <= newReview.rating ? "#FFB800" : "#e4e5e9"} onClick={() => handleRatingClick(star)} />
                        ))}
                    </div>
                </div>
                <div className="form-group">
                    <label>Review</label>
                    <textarea name="text" rows="4" value={newReview.text} onChange={handleInputChange} placeholder="How was the product?" required></textarea>
                </div>
                <button type="submit" className="submit-review-btn">Submit Review</button>
            </form>
          </div>
        </div>
      )}
    </div>
 </> );
};

export default ProductDetails;