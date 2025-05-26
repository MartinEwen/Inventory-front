import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

    useEffect(() => {
        api.get('/products')
            .then(res => setProducts(res.data))
            .catch(err => console.error('Error loading products:', err));
    }, []);

    const sortBy = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const sortedProducts = [...products].sort((a, b) => {
        let aValue = sortConfig.key === 'category' ? a.category?.name || '' : a[sortConfig.key];
        let bValue = sortConfig.key === 'category' ? b.category?.name || '' : b[sortConfig.key];

        if (['price', 'quantity'].includes(sortConfig.key)) {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const getArrow = (key) => {
        if (sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div className="p-4">
            <h1 className="text-center text-2xl mb-6">Stock</h1>

            <div className="overflow-x-auto text-center">
                <table className="min-w-full table-auto border-collapse border border-gray-400 rounded shadow">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th
                                className="border border-gray-400 px-4 py-2 font-bold text-black cursor-pointer"
                                onClick={() => sortBy('name')}
                            >
                                Name{getArrow('name')}
                            </th>
                            <th className="border border-gray-400 px-4 py-2 font-bold text-black">Description</th>
                            <th
                                className="border border-gray-400 px-4 py-2 font-bold text-black cursor-pointer"
                                onClick={() => sortBy('quantity')}
                            >
                                Quantity{getArrow('quantity')}
                            </th>
                            <th
                                className="border border-gray-400 px-4 py-2 font-bold text-black cursor-pointer"
                                onClick={() => sortBy('price')}
                            >
                                Price{getArrow('price')}
                            </th>
                            <th
                                className="border border-gray-400 px-4 py-2 font-bold text-black cursor-pointer"
                                onClick={() => sortBy('category')}
                            >
                                Category{getArrow('category')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedProducts.map(prod => (
                            <tr key={prod.id} className="text-center bg-gray-100 hover:bg-gray-200">
                                <td className="border border-gray-400 px-4 py-2">{prod.name}</td>
                                <td className="border border-gray-400 px-4 py-2">{prod.description}</td>
                                <td className="border border-gray-400 px-4 py-2">{prod.quantity}</td>
                                <td className="border border-gray-400 px-4 py-2">{prod.price} €</td>
                                <td className="border border-gray-400 px-4 py-2">{prod.category?.name || '-'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Home;
