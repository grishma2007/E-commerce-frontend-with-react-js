// src/Pages/Wishlist/Wishlist.jsx
import { Link } from 'react-router-dom';
import { useWishlist } from '../../Context/WishlistContext';
import { useCart } from '../../Context/CartContext';
import { FaTrash, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart(); // Assuming your CartContext has this function

  if (wishlist.length === 0) {
    return (
      <div className="wishlist-empty-container">
        <div className="empty-content">
            <h2>Your Wishlist is Empty</h2>
            <p>Keep track of the eyewear you love.</p>
            <Link to="/shop" className="btn-browse">
                <FaArrowLeft /> Browse Shop
            </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page-container">
      <div className="wishlist-header">
        <h1>My Wishlist ({wishlist.length})</h1>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => {
            // Handle different ID formats (MongoDB _id vs standard id)
            const itemId = item._id || item.id; 
            
            return (
              <div key={itemId} className="wishlist-card">
                <div className="wishlist-img-wrapper">
                  <Link to={`/product/${itemId}`}>
                    <img src={item.image} alt={item.name} />
                  </Link>
                  <button 
                    className="btn-remove" 
                    onClick={() => removeFromWishlist(itemId)}
                    title="Remove from wishlist"
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="wishlist-info">
                  <Link to={`/product/${itemId}`}>
                    <h3>{item.name}</h3>
                  </Link>
                  <p className="price">{item.price}</p>
                  
                  <button 
                    className="btn-move-cart"
                    onClick={() => {
                        // Adapt this to match exactly how your addToCart expects data
                        addToCart({ ...item, quantity: 1 });
                        removeFromWishlist(itemId); // Optional: Remove from wishlist after adding to cart
                    }}
                  >
                    <FaShoppingCart /> Move to Cart
                  </button>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};

export default Wishlist;