import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import UserDashboard from './pages/UserDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import TherapistBookingSystem from "./components/TherapistBookingSystem";
import SelfHelpResources from "./components/SelfHelpResources";
import ArticlePage from "./pages/ArticlePage"; 
import './App.css';
import axios from 'axios';
import TestPage from './pages/TestPage';
import SelfAssessmentTests from './pages/SelfAssessmentTests';


axios.defaults.baseURL = 'https://localhost:7203';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

const App = () => {
  return (
    <Router>
      <MainApp />
    </Router>
  );
};

const MainApp = () => {
  const location = useLocation();

  // Define routes where the header should not be displayed
  const hideHeaderRoutes = ["/userDashboard", "/doctorDashboard", "/book-therapist", ];

  return (
    <>
      {/* Conditionally render Header */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/resources" element={<SelfHelpResources />} />
          <Route path="/resources/:id" element={<ArticlePage />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/doctorDashboard" element={<DoctorDashboard />} />
          <Route path="/book-therapist" element={<TherapistBookingSystem />} />
          <Route path="/userDashboard/self-assessment" element={<SelfAssessmentTests />} />
          <Route path="/userDashboard/self-assessment/:testType" element={<TestPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default App;
