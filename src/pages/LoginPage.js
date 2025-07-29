import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage('');
  try {
    const response = await axios.post('http://localhost:8081/api/auth/loginPage', {
      email,
      password
    });
    setMessage(response.data.message);

    if (response.data.message.includes('successful')) {
      setTimeout(() => navigate('/home'), 1000);
    }
  } catch (error) {
    setMessage(error.response?.data?.message || 'Login failed');
  }
};


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4 text-primary">Login</h2>
        {message && (
          <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
      <button type="submit" className="btn btn-primary w-100">Login</button>
        </form>
        <div className="mt-3 text-center">
          <Link to="/signup" className="text-decoration-none">Don't have an account? Sign Up</Link>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
