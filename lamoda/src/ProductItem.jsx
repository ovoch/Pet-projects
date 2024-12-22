
import React from 'react';
import styles from './styles.module.css';

const ProductItem = ({ product }) => {
    return (
        <div>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Цвет: {product.color}</p>
            <p>Категория: {product.category}</p>
            <p>Цена: {product.price} Руб.</p>
            <p>Рейтинг: {product.rating}</p>
        </div>
    );
}

export default ProductItem;
