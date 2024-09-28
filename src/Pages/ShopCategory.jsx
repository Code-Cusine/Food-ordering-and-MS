import React, { useContext } from 'react';
import '../components/Items/combined-item-styles.css';
import { ShopContext } from '../context/ShopContext';
import Item from '../components/Items/Item';

const ShopCategory = (props) => {
    const { all_product } = useContext(ShopContext);

    // Filter products based on the category
    const categoryProducts = all_product.filter(item => item.category === props.category);

    return (
        <div className="shop-category">
            <div className="items-container">
                {categoryProducts.map((item, i) => (
                    <Item key={i} {...item} />
                ))}
            </div>
        </div>
    );
};

export default ShopCategory;