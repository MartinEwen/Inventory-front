import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

const Login = () => {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', loginData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (err) {
      alert('Échec de la connexion');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', registerData);
      const token = res.data.user.token;
      localStorage.setItem('token', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      navigate('/');
    } catch (err) {
      alert('Erreur lors de la création du compte');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Connexion</h2>
      <form onSubmit={handleLogin} className="mb-6 grid grid-cols-2 gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={loginData.email}
          onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
          value={loginData.password}
          onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
        />
        <button type="submit" className="col-span-2 bg-blue-600 text-white py-2 rounded">
          Se connecter
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Créer un compte</h2>
      <form onSubmit={handleRegister} className="grid grid-cols-2 gap-4">
        <input
          type="text"
          placeholder="Nom"
          className="border p-2 rounded"
          value={registerData.name}
          onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Prénom"
          className="border p-2 rounded"
          value={registerData.lastname}
          onChange={(e) => setRegisterData({ ...registerData, lastname: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={registerData.email}
          onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="border p-2 rounded"
          value={registerData.password}
          onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          className="border p-2 rounded"
          value={registerData.password_confirmation}
          onChange={(e) =>
            setRegisterData({ ...registerData, password_confirmation: e.target.value })
          }
        />
        <button type="submit" className="col-span-2 bg-green-600 text-white py-2 rounded">
          Créer un compte
        </button>
      </form>
    </div>
  );
};

export default Login;
