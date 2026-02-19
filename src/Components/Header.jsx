import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { IoSearch, IoClose } from "react-icons/io5";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { CgShoppingBag } from "react-icons/cg";
import axios from "axios"; 
import ProductCard from "../Pages/shop/components/Productcard";
import { useCart } from "../Context/CartContext"; 
import { useAuth } from "../Context/AuthContext"; 
import { useWishlist } from "../Context/WishlistContext";
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const { isLoggedIn } = useAuth();
  const { wishlist } = useWishlist();
  const { setIsCartOpen, cart } = useCart(); 
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios
      .get("https://e-commerce-backend-node-js-eyecore.vercel.app/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log("Error fetching products:", err));
  }, []);

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const randomProducts = [...products].sort(() => 0.5 - Math.random()).slice(0, 4);
  
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isSearchOpen ? "hidden" : "auto";
  }, [isSearchOpen]);

  return (
    <>
      <header className={`header d-flex ${isScrolled ? "scrolled" : ""}`}>
        <div className="logo">
          <Link to="/">Eyecore</Link>
        </div>

        <nav>
          <ul className="nav-links">
            <li><NavLink to="/" end>Home</NavLink></li>
            <li><NavLink to="/shop">Shop</NavLink></li>
            <li><NavLink to="/blogs">About us</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
          </ul>
        </nav>

        <div className="nav-icons">
          <div className="icon-item" onClick={() => setIsSearchOpen(true)}>
            <IoSearch />
          </div>
          
          {/* --- 3. CONDITIONAL PROFILE LINK --- */}
          <div className="icon-item">
            <NavLink 
              to={isLoggedIn ? "/profile" : "/login"} 
              style={{ color: 'inherit', display: 'flex' }}
            >
              <FaRegUser />
            </NavLink>
          </div>
          {/* ----------------------------------- */}

          <div className="icon-item" style={{ position: 'relative' }}>
  <Link to="/wishlist" style={{ color: 'inherit', display: 'flex' }}>
    <FaRegHeart />
    {/* Optional: Show badge if items exist */}
    {wishlist.length > 0 && (
      <span style={{
        position: 'absolute',
        top: '-5px',
        right: '-8px',
        background: 'black',
        color: 'white',
        fontSize: '10px',
        borderRadius: '50%',
        width: '15px',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {wishlist.length}
      </span>
    )}
  </Link>
</div>
          
          <div 
            className="icon-item cart-icon" 
            onClick={() => setIsCartOpen(true)} 
            style={{ position: 'relative', cursor: 'pointer' }}
          >
            <CgShoppingBag />
            {totalItems > 0 && (
              <span className="cart-badge">{totalItems}</span>
            )}
          </div>
        </div>
      </header>

      {/* Search Overlay (Kept same as your code) */}
      <div className={`search-overlay ${isSearchOpen ? "open" : ""}`}>
        <button className="close-search-btn" onClick={() => setIsSearchOpen(false)}>
          <IoClose />
        </button>

        <div className="search-content-container">
          <h2 className="search-title">Search our site</h2>
          <div className="search-bar-wrapper">
            <IoSearch className="search-icon-inside" />
            <input 
              type="text" 
              placeholder="Search for eyewear..." 
              autoFocus={isSearchOpen} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <h3 className="search-subtitle">
            {searchTerm ? `Results for "${searchTerm}"` : "Need some inspiration?"}
          </h3>
          
          <div className="product-grid">
            {(searchTerm ? filteredProducts : randomProducts).map((item) => (
              <ProductCard
                key={item._id}
                id={item._id}
                name={item.name}
                price={`₹${item.price}`}
                image={`http://localhost:5000/${item.image}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;