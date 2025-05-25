import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get('/products') 
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error loading products:', err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-center text-2xl font-bold mb-6 underline">Stock</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="border border-gray-400 px-4 py-2 font-bold">Name</th>
              <th className="border border-gray-400 px-4 py-2 font-bold">Description</th>
              <th className="border border-gray-400 px-4 py-2 font-bold">Quantity</th>
              <th className="border border-gray-400 px-4 py-2 font-bold">Price</th>
              <th className="border border-gray-400 px-4 py-2 font-bold">Category</th>
            </tr>
          </thead>
          <tbody>
            {products.map(prod => (
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
