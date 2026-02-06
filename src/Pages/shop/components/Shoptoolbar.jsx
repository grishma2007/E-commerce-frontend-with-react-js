import React, { useState } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

const ShopToolbar = ({ onOpenFilters }) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Recommended");

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsSortOpen(false); 
    console.log(`Sorting by: ${option}`); 
  };

  return (
    <div className="shop-toolbar">
      <div className="toolbar-left">
        <button className="filter-trigger-btn" onClick={onOpenFilters}>
          <SlidersHorizontal size={18} /> Filters
        </button>
      </div>

      <div className="toolbar-right">
        <div className="sort-dropdown" onClick={() => setIsSortOpen(!isSortOpen)}>
          <span>Sort By: {selectedSort}</span>
          <ChevronDown size={16} />

          {isSortOpen && (
            <div className="sort-menu">
              <button className="sort-option" onClick={() => handleSortSelect("Recommended")}>
                Recommended
              </button>
              <button className="sort-option" onClick={() => handleSortSelect("Newest")}>
                Newest Arrivals
              </button>
              <button className="sort-option" onClick={() => handleSortSelect("Price: Low to High")}>
                Price: Low to High
              </button>
              <button className="sort-option" onClick={() => handleSortSelect("Price: High to Low")}>
                Price: High to Low
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShopToolbar;