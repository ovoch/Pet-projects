
import React from 'react';

const ProductList = ({ products }) => {
    if (products.length === 0) {
        return <p>По вашему запросу ничего не найдено.</p>;
    }

    return (
        <div>
            {products.map(product => (
                <div key={product.id} className="product">
                    <img src={product.imageUrl} alt={product.name} />
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Цвет: {product.color}</p>
                    <p>Категория: {product.category}</p>
                    <p>Цена: {product.price} руб.</p>
                    <p>Рейтинг: {product.rating}</p>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
