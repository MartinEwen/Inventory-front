// import React from 'react';
// import { NavLink } from 'react-router-dom';

// const Navbar = () => {
//   const linkClass = ({ isActive }) =>
//     `px-4 py-2 rounded-md font-bold mx-1 ${
//       isActive ? 'bg-gray-800 text-white' : 'bg-gray-300 text-gray-800'
//     }`;

//   return (
//     <nav className="bg-gray-700 text-white px-6 py-4 flex items-center justify-between">
//       <h1 className="text-xl font-bold">Inventory</h1>
//       <div className="space-x-2">
//         <NavLink to="/" className={linkClass}>
//           Home
//         </NavLink>
//         <NavLink to="/products" className={linkClass}>
//           Products
//         </NavLink>
//         <NavLink to="/categories" className={linkClass}>
//           Categories
//         </NavLink>
//         <NavLink to="/products/low-stock" className={linkClass}>
//           Low stock
//         </NavLink>
//         <NavLink to="/login" className={linkClass}>
//           Login
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', background: '#f5f5f5', display: 'flex', justifyContent: 'space-between' }}>
      <h1>Inventory</h1>
      <div>
        <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
        <Link to="/products" style={{ marginRight: '1rem' }}>Products</Link>
        <Link to="/products/low-stock" style={{ marginRight: '1rem' }}>Low Stock</Link>
        <Link to="/categories" style={{ marginRight: '1rem' }}>Category</Link>

        {token ? (
          <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
