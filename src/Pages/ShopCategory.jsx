import React, { useContext, useState } from 'react';
import '../components/Items/combined-item-styles.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Items/Item';
import FoodFilter from '../components/Filters/FoodFilters';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);
    const [foodFilter, setFoodFilter] = useState('all');

    // Filter products based on category and food type if applicable
    const filteredProducts = all_product.filter(item => {
        // First, check if the item belongs to the current category
        if (item.category === props.category) {
            // If we're in the Food category and have an active filter
            if (props.category === 'Food') {
                switch (foodFilter) {
                    case 'all':
                        return true; // Show all food items
                    case 'veg':
                        return item.isVeg; // Show only vegetarian items
                    case 'nonveg':
                        return !item.isVeg; // Show only non-vegetarian items
                    default:
                        return true;
                }
            }
            // For all other categories, show all items
            return true;
        }
        // If item doesn't belong to current category, don't show it
        return false;
    });

    return (
        <div className={`shop-category background-${props.category.toLowerCase()}`}>
            <div className="shop-category-container">
                {/* Only show the filter in the Food category */}
                {props.category === 'Food' && (
                    <FoodFilter 
                        currentFilter={foodFilter} 
                        onFilterChange={setFoodFilter}
                    />
                )}
                <div className="items-container">
                    {filteredProducts.map((item, i) => (
                        <Item key={i} {...item} />
                    ))}
                </div>
                {filteredProducts.length === 0 && (
                    <div className="no-items-message">
                        <h3>No items found</h3>
                        <p>Try adjusting your filter selection.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopCategory;