import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/Header.css';
import logo from '../img/logo.jpg';

const Header = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    setUser(null);
    navigate('/login');
  };

  const goToDashboard = () => {
    if (user?.role === 'Therapist') {
      navigate('/doctorDashboard');
    } else {
      navigate('/userDashboard');
    }
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/"><img src={logo} alt="uplift-logo" /></Link>
      </div>
      <nav>
        <ul>
          {user ? (
            <>
              <li className='dashboard'>
                <button onClick={goToDashboard}>Dashboard</button>
              </li>
              <li className='logout'>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className='login'><Link to="/login">Sign in</Link></li>
              <li className='signup'><Link to="/signup">Sign up</Link></li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
