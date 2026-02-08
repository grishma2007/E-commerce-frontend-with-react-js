import { X } from 'lucide-react';

const Sidebar = ({ isOpen, onClose, currentFilters, onFilterChange }) => {
  
  // Helper to check if a button is active
  const isActive = (type, value) => {
    if (value === "All") return currentFilters[type] === null;
    return currentFilters[type] === value;
  };

  return (
    <>
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose} 
      />

      <aside className={`shop-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Filters</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* --- Category Filter --- */}
        <div className="filter-group">
          <h3 className="filter-title">Category</h3>
          <div className="filter-list">
            <button 
              className={isActive('category', 'All') ? 'active-filter' : ''}
              onClick={() => onFilterChange('category', 'All')}
            >
              All Eyewear
            </button>
            <button 
              className={isActive('category', 'Optical') ? 'active-filter' : ''}
              onClick={() => onFilterChange('category', 'Optical')}
            >
              Optical
            </button>
            <button 
              className={isActive('category', 'Sunglasses') ? 'active-filter' : ''}
              onClick={() => onFilterChange('category', 'Sunglasses')}
            >
              Sunglasses
            </button>
          </div>
        </div>

        {/* --- Gender Filter --- */}
        <div className="filter-group">
          <h3 className="filter-title">Gender</h3>
          <div className="filter-list">
            <button 
               className={isActive('gender', 'All') ? 'active-filter' : ''}
               onClick={() => onFilterChange('gender', 'All')}
            >
              All
            </button>
            <button 
               className={isActive('gender', 'Men') ? 'active-filter' : ''}
               onClick={() => onFilterChange('gender', 'Men')}
            >
              Men
            </button>
            <button 
               className={isActive('gender', 'Women') ? 'active-filter' : ''}
               onClick={() => onFilterChange('gender', 'Women')}
            >
              Women
            </button>
            <button 
               className={isActive('gender', 'Unisex') ? 'active-filter' : ''}
               onClick={() => onFilterChange('gender', 'Unisex')}
            >
              Unisex
            </button>
          </div>
        </div>

        {/* --- Frame Shape Filter --- */}
        <div className="filter-group">
          <h3 className="filter-title">Frame Shape</h3>
          <div className="filter-list">
             <button 
               className={isActive('shape', 'All') ? 'active-filter' : ''}
               onClick={() => onFilterChange('shape', 'All')}
             >
               All Shapes
             </button>
             <button 
               className={isActive('shape', 'Round') ? 'active-filter' : ''}
               onClick={() => onFilterChange('shape', 'Round')}
             >
               Round
             </button>
             <button 
               className={isActive('shape', 'Square') ? 'active-filter' : ''}
               onClick={() => onFilterChange('shape', 'Square')}
             >
               Square
             </button>
             <button 
               className={isActive('shape', 'Aviator') ? 'active-filter' : ''}
               onClick={() => onFilterChange('shape', 'Aviator')}
             >
               Aviator
             </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;