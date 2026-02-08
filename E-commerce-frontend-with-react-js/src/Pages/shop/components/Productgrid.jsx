import ProductCard from "./Productcard";
import { useEffect, useState } from "react";
import axios from "axios";

const ProductGrid = ({ filters }) => { // <--- Receive filters prop
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // --- FILTERING LOGIC ---
  const filteredProducts = products.filter((product) => {
    // 1. Check Category
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    // 2. Check Gender
    if (filters.gender && product.gender !== filters.gender) {
      return false;
    }
    // 3. Check Shape (Ensure your DB has a 'shape' or 'frameShape' field)
    if (filters.shape && product.shape !== filters.shape) {
      return false;
    }
    
    return true; // Keep product if all checks pass
  });

  return (
    <div className="product-grid">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <ProductCard
            key={item._id}
            id={item._id}
            name={item.name}
            price={`₹${item.price}`}
            image={`http://localhost:5000/${item.image}`}
          />
        ))
      ) : (
        <div className="no-products-msg">No products found matching filters.</div>
      )}
    </div>
  );
};

export default ProductGrid;