
import Chance from 'chance';

const chance = new Chance();

const imageUrls = [
    'https://via.placeholder.com/200x200?text=Product+1',
    'https://via.placeholder.com/200x200?text=Product+2',
    'https://via.placeholder.com/200x200?text=Product+3',
    'https://via.placeholder.com/200x200?text=Product+4',
    'https://via.placeholder.com/200x200?text=Product+5',
    'https://via.placeholder.com/200x200?text=Product+6',
    'https://via.placeholder.com/200x200?text=Product+7',
    'https://via.placeholder.com/200x200?text=Product+8',
    'https://via.placeholder.com/200x200?text=Product+9',
    'https://via.placeholder.com/200x200?text=Product+10',
];

export const generateProducts = (num) => {
    const colors = ['red', 'blue', 'green', 'yellow', 'purple'];
    const categories = ['Обувь','Куртки','Штаны','Футболки','Платья'];
    const products = [];

    for (let i = 0; i < num; i++) {
        products.push({
            id: chance.guid(),
            name: chance.word(),
            description: chance.sentence({ words: 10 }),
            color: chance.pickone(colors),
            category: chance.pickone(categories),
            price: chance.integer({ min: 10, max: 9999 }),
            rating: chance.floating({ min: 0, max: 5, fixed: 1 }),
            imageUrl: chance.pickone(imageUrls), 
        });
    }

    return products;
};
