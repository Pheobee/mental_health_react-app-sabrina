// SignUpPage.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import pic1 from "../img/Tablet login-bro.png";
import { getUser, isAuthenticated, logoutUser } from '../utils/auth';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);
  
    if (!name || !email || !password || !confirmPassword || !role) {
      setErrorMessage('Please fill in all fields.');
      setLoading(false);
      return;
    }
  
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      setLoading(false);
      return;
    }
  
    try {
      // First: Sign the user up
      await axios.post('/api/Auth/signup', {
        name,
        email,
        password,
        role,
      }, {
        headers: { "Content-Type": "application/json" }
      });
  
      // Then: Log them in immediately
      const loginResponse = await axios.post('/api/Auth/login', {
        email,
        password
      });
  
      const { token, role: userRole, name: userName } = loginResponse.data;
  
      localStorage.setItem('user', JSON.stringify({
        token,
        name: userName,
        email,
        role: userRole
      }));
  
      // Navigate to appropriate dashboard
      if (userRole === 'Therapist') {
        navigate('/doctorDashboard');
      } else {
        navigate('/userDashboard');
      }
  
    } catch (error) {
      setErrorMessage(error.response?.data?.Message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className='signUp'>
      <img src={pic1} alt="Sign Up Illustration" />
      <form onSubmit={handleSignUp}>
        <h2>Create Your Account</h2>
        {errorMessage && <p className='error'>{errorMessage}</p>}
        <input
          type='email'
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
  type='text'
  placeholder='Name'
  value={name}
  onChange={(e) => setName(e.target.value)}
  required
/>
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Confirm Password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value='' disabled>Select Role</option>
          <option value='User'>User</option>
          <option value='Therapist'>Therapist</option>
        </select>
        <button type='submit' disabled={loading}>
          {loading ? 'Signing up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
