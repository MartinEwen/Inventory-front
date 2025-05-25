import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 rounded-md font-bold mx-1 ${
      isActive ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
    }`;

  return (
    <nav className="bg-gray-700 text-white px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold">Inventory</h1>
      <div className="space-x-2">
        <NavLink to="/" className={linkClass}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/categories" className={linkClass}>
          Categories
        </NavLink>
        <NavLink to="/low-stock" className={linkClass}>
          Low stock
        </NavLink>
        <NavLink to="/login" className={linkClass}>
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
