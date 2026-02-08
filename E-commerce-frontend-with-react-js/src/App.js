import './App.css';
import { Routes, Route } from "react-router-dom";

import MainLayout from './Pages/Layout';

import Home from './Pages/Home';
import Shop from './Pages/shop/Shop';
import Blogs from './Pages/About/Aboutus';
import Contact from './Pages/contact/Contact';
import Auth from './Pages/Auth/Auth';
import ProductDetails from './Pages/shop/ProductDetails';
import CartSidebar from './Components/CartSidebar';
import { CartProvider } from './Context/CartContext';
import Checkout from './Pages/checkout/checkout';
import Profile from './Pages/Profile/Profile';
import OrderDetails from './Pages/Profile/OrderDetails';
import { WishlistProvider } from './Context/WishlistContext';
import Wishlist from './Pages/Wishlist/Wishlist';
// import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
      <CartSidebar />

    <Routes>
      {/* Pages WITH header & footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/order-details/:orderId" element={<OrderDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Route>

      {/* Pages WITHOUT header & footer */}
      {/* <Toaster position="top-center" /> */}
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/login" element={<Auth />} />
    
    </Routes>
    </WishlistProvider>
    </CartProvider>
  );
}

export default App;
