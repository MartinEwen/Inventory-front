import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Category from './pages/Category';
import Products from './pages/Products';
import LowStock from './pages/Low';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories" element={<Category />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/low-stock" element={<LowStock />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
