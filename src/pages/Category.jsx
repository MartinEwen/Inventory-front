import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editing, setEditing] = useState({});

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Create category
  const handleCreate = async e => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };

  // Update category
  const handleEdit = async (id, newName) => {
    try {
      await api.put(`/categories/${id}`, { name: newName });
      setEditing(prev => ({ ...prev, [id]: false }));
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6">Category Management</h2>

      {/* Create New Category */}
      <form onSubmit={handleCreate} className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter category name"
          value={newCategory}
          onChange={e => setNewCategory(e.target.value)}
          className="border p-2 rounded flex-grow"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create
        </button>
      </form>

      {/* Categories Table */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td className="border p-2">{cat.id}</td>
              <td className="border p-2">
                {editing[cat.id] ? (
                  <input
                    type="text"
                    value={cat.name}
                    onChange={e => {
                      const updated = categories.map(c =>
                        c.id === cat.id ? { ...c, name: e.target.value } : c
                      );
                      setCategories(updated);
                    }}
                    className="border p-1 rounded"
                  />
                ) : (
                  cat.name
                )}
              </td>
              <td className="border p-2">
                {editing[cat.id] ? (
                  <button
                    onClick={() => handleEdit(cat.id, cat.name)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => setEditing(prev => ({ ...prev, [cat.id]: true }))}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
