import { useCart } from '../Context/CartContext'; 
import './CartSidebar.css'; 
import { NavLink } from 'react-router-dom';

const CartSidebar = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        
        <div className="cart-header">
          <h2>Bag ({cart.length})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>
            &times;
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your bag is empty.</p>
              <button onClick={() => setIsCartOpen(false)} className="continue-btn">
                Start Shopping
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                
                <div className="item-details">
                  <div className="item-top">
                    <h4>{item.name}</h4>
                    <span className="item-price">${item.price}</span>
                  </div>
                  
                  <div className="item-controls">
                    <div className="quantity-wrapper">
                      <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)} 
                      className="remove-btn"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="subtotal">
              <span>Subtotal</span>
              <span className="amount">${cartTotal.toFixed(2)}</span>
            </div>
            <p className="tax-note">Shipping & taxes calculated at checkout</p>
          <NavLink to="/checkout" onClick={() => setIsCartOpen(false)}>
              <button className="checkout-btn">Checkout</button>
            </NavLink>
          </div>
        )}

      </div>
    </div>
  );
};

export default CartSidebar;