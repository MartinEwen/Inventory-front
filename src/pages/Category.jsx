import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editing, setEditing] = useState({});

  const fetchCategories = async () => {
    try {
      const res = await api.get('/categories');
      setCategories(res.data);
    } catch (err) {
      alert('Erreur lors du chargement des catégories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await api.post('/categories', { name: newCategory });
      setNewCategory('');
      fetchCategories();
    } catch (err) {
      alert('Erreur lors de la création');
    }
  };

  const handleEditChange = (id, value) => {
    setEditing({ ...editing, [id]: value });
  };

  const handleUpdate = async (id) => {
    try {
      await api.put(`/categories/${id}`, { name: editing[id] });
      setEditing({ ...editing, [id]: '' });
      fetchCategories();
    } catch (err) {
      alert('Erreur lors de la mise à jour');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Gérer les catégories</h2>

      <form onSubmit={handleCreate} className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="Nom de la catégorie"
          className="border px-3 py-2 rounded w-64"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Ajouter
        </button>
      </form>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2">Nom</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id} className="border-b">
              <td className="px-4 py-2">
                <input
                  type="text"
                  placeholder={cat.name}
                  value={editing[cat.id] ?? ''}
                  className="border px-2 py-1 rounded w-full"
                  onChange={(e) => handleEditChange(cat.id, e.target.value)}
                />
              </td>
              <td className="px-4 py-2">
                <button
                  className="bg-green-600 text-white px-3 py-1 rounded"
                  onClick={() => handleUpdate(cat.id)}
                  disabled={!editing[cat.id]}
                >
                  Modifier
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
