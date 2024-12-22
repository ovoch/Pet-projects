
import React from 'react';

const Filters = ({ filters, onFilterChange }) => {
    const handleCategoryChange = (event) => {
        onFilterChange({ category: event.target.value });
    };

    const handleColorChange = (event) => {
        const value = event.target.value;
        const newColors = filters.colors.includes(value)
            ? filters.colors.filter(color => color !== value)
            : [...filters.colors, value];
        onFilterChange({ colors: newColors });
    };

    const handlePriceChange = (event) => {
        const value = event.target.value;
        const index = event.target.dataset.index;
        const newPriceRange = [...filters.priceRange];
        newPriceRange[index] = value !== '' ? Number(value) : 0;
        onFilterChange({ priceRange: newPriceRange });
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Поиск"
                value={filters.search}
                onChange={(e) => onFilterChange({ search: e.target.value })}
            />
            <div>
                <h5>Цвета</h5>
                {['red', 'blue', 'green', 'yellow', 'purple'].map((color) => (
                    <label key={color}>
                        <input
                            type="checkbox"
                            value={color}
                            checked={filters.colors.includes(color)}
                            onChange={handleColorChange}
                        /> {color}
                    </label>
                ))}
            </div>
            <div>
                <h5>Цена</h5>
                <input
                    type="number"
                    data-index={0}
                    value={filters.priceRange[0]}
                    onChange={handlePriceChange}
                    placeholder="Минимум"
                />
                <input
                    type="number"
                    data-index={1}
                    value={filters.priceRange[1]}
                    onChange={handlePriceChange}
                    placeholder="Максимум"
                />
            </div>
            <div>
                <h5>Категория</h5>
                <select onChange={handleCategoryChange}>
                    <option value="">Все категории</option>
                    {['shoes', 'jackets', 'pants', 't-shirts', 'dresses'].map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filters;
