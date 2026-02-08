import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const WishlistContext = createContext();

// Custom hook to use the wishlist easily
export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  // Initialize state from LocalStorage if available
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem('eyecore_wishlist');
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // Save to LocalStorage whenever the wishlist changes
  useEffect(() => {
    localStorage.setItem('eyecore_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Function to add an item
  const addToWishlist = (product) => {
    // Check if item already exists to prevent duplicates
    const exists = wishlist.find((item) => item.id === product.id || item._id === product._id);
    if (!exists) {
      setWishlist([...wishlist, product]);
    }
  };

  // Function to remove an item
  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => (item.id || item._id) !== productId));
  };

  // Function to check if an item is already in the wishlist (for the heart icon state)
  const isInWishlist = (productId) => {
    return wishlist.some((item) => (item.id || item._id) === productId);
  };

  // Toggle function (Add if not there, remove if it is)
  const toggleWishlist = (product) => {
    const productId = product.id || product._id;
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <WishlistContext.Provider 
      value={{ 
        wishlist, 
        addToWishlist, 
        removeFromWishlist, 
        isInWishlist,
        toggleWishlist
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};