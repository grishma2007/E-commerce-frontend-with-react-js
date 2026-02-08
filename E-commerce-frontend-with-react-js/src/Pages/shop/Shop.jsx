import { useState } from "react";
import ShopHero from "./components/Shophero";
import ShopToolbar from "./components/Shoptoolbar";
import ProductGrid from "./components/Productgrid";
import Sidebar from "./components/Sidebar";
import "./shop.css";

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // --- 1. NEW: State for Filters ---
  const [filters, setFilters] = useState({
    category: null,   // null means "All"
    gender: null,
    shape: null
  });

  // --- 2. NEW: Handler to update filters ---
  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value === "All" ? null : value // If "All" is clicked, set to null
    }));
  };

  return (
    <div className="shop-wrapper">
      <ShopHero />
      
      <div className="shop-container">
        <ShopToolbar onOpenFilters={() => setIsSidebarOpen(true)} />
        
        <div className="shop-content-layout">
          {/* Pass filters and handler to Sidebar */}
          <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            currentFilters={filters}           // <--- Pass current state
            onFilterChange={handleFilterChange} // <--- Pass handler
          />
          
          {/* Pass active filters to ProductGrid */}
          <ProductGrid filters={filters} />
        </div>
      </div>
    </div>
  );
};

export default Shop;