
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useWishlist } from '../../../Context/WishlistContext';
import { useCart } from '../../../Context/CartContext';

const ProductCard = ({ id, name, price, image }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart(); 
  
  // This object already has the correct image path
  const product = { _id: id, id, name, price, image };
  
  const isWishlisted = isInWishlist(id);


  const handleAddToCart = () => {
    
    addToCart(product);
  };
  // ---------------------------

  return (
    <div className="product-card">
      <div className="card-img-wrapper">
        <Link to={`/product/${id}`}>
           
            <img src={image} alt={name} />
        </Link>
        
        <button 
            className="wishlist-btn" 
            
            onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
            }}
            style={{
               position: 'absolute',
                 top: '10px',
                 right: '10px',
                 background: 'white',
                 border: 'none',
                 borderRadius: '50%',
                 width: '35px',
                 height: '35px',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 cursor: 'pointer',
                 zIndex: 10,
                 boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
             }}
        >
            {isWishlisted ? <FaHeart color="black" /> : <FaRegHeart />}
        </button>

        <button className="quick-add-btn" onClick={handleAddToCart}>Quick Add</button>
      </div>

      <div className="card-content">
        <h5>{name}</h5>
        <h4>{price}</h4>
      </div>
    </div>
  );
};

export default ProductCard;