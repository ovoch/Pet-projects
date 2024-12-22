
import React, { useState, useMemo } from 'react';
import ProductList from './ProductList';
import Filters from './Filters';
import Chance from 'chance';

const chance = new Chance();

const generateProducts = (num) => {
    const images = [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150/FF0000/FFFFFF?text=Red',
        'https://via.placeholder.com/150/00FF00/FFFFFF?text=Green',
        'https://via.placeholder.com/150/0000FF/FFFFFF?text=Blue',
        'https://via.placeholder.com/150/FFFF00/FFFFFF?text=Yellow',
    ];

    return Array.from({ length: num }, (_, index) => ({
        id: index + 1,
        name: chance.word(),
        description: chance.sentence(),
        color: chance.pickone(['red', 'blue', 'green', 'yellow', 'purple']),
        category: chance.pickone(['shoes', 'jackets', 'pants', 't-shirts', 'dresses']),
        price: chance.integer({ min: 10, max: 9999 }),
        rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
        imageUrl: chance.pickone(images), 
    }));
};

const App = () => {
    const [products] = useState(generateProducts(50));
    const [filters, setFilters] = useState({
        search: '',
        colors: [],
        priceRange: [0, 10000],
        category: '',
    });
    const [sortOption, setSortOption] = useState('priceAsc');

    const handleFilterChange = (newFilters) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const handleSortChange = (option) => {
        setSortOption(option);
    };

    const filteredProducts = useMemo(() => {
        return products
            .filter((product) => {
                const matchesSearch =
                    product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
                    product.description.toLowerCase().includes(filters.search.toLowerCase());
                const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.color);
                const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
                const matchesCategory = !filters.category || product.category === filters.category;

                return matchesSearch && matchesColor && matchesPrice && matchesCategory;
            })
            .sort((a, b) => {
                switch (sortOption) {
                    case 'priceAsc':
                        return a.price - b.price;
                    case 'priceDesc':
                        return b.price - a.price;
                    case 'ratingDesc':
                        return b.rating - a.rating;
                    default:
                        return 0;
                }
            });
    }, [products, filters, sortOption]);

    return (
        <div className="app">
            <Filters filters={filters} onFilterChange={handleFilterChange} />
            <div>
                <h5>Сортировка:</h5>
                <button onClick={() => handleSortChange('priceAsc')}>Сначала дешевые</button>
                <button onClick={() => handleSortChange('priceDesc')}>Сначала дорогие</button>
                <button onClick={() => handleSortChange('ratingDesc')}>Сначала популярные</button>
            </div>
            <ProductList products={filteredProducts} />
        </div>
    );
};

export default App;
