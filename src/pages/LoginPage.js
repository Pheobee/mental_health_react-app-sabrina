import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import picc2 from "../img/Tablet login-cuate.png";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await axios.post('/api/Auth/login', {
        email,
        password
      });

      const { token, role, name } = response.data;

      // Save everything in one object
      localStorage.setItem('user', JSON.stringify({
        token,
        name,
        email,
        role
      }));

      if (role === 'User') {
        navigate('/userDashboard');
      } else if (role === 'Therapist') {
        navigate('/doctorDashboard');
      } else {
        navigate('/');
      }

    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='signUp'>
      <img src={picc2} alt="Login Illustration" />
      <form onSubmit={handleLogin}>
        <h2>Login to Uplift</h2>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
