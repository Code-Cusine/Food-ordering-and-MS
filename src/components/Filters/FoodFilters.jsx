import React from 'react';
import '../Filters/FoodFilters.css'; // Adjusted the CSS file name for clarity

const FoodFilter = ({ currentFilter, onFilterChange }) => {
    return (
        <div className="food-filter">
            <button 
                className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
                onClick={() => onFilterChange('all')}
            >
                All
            </button>
            <button 
                className={`filter-btn veg ${currentFilter === 'veg' ? 'active veg-active' : ''}`}
                onClick={() => onFilterChange('veg')}
            >
                Vegetarian
            </button>
            <button 
                className={`filter-btn nonveg ${currentFilter === 'nonveg' ? 'active nonveg-active' : ''}`}
                onClick={() => onFilterChange('nonveg')}
            >
                Non-Vegetarian
            </button>
        </div>
    );
};

export default FoodFilter;
