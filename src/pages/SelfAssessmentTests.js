// SelfAssessmentTests.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../css/SelfAssessmentTests.css';

const SelfAssessmentTests = () => {
  return (
    <div className="self-assessment-container">
      <h1>Self-Assessment Tests</h1>
      <p>Select a test below to begin:</p>
      <div className="test-options">
        <Link className="test-card" to="/userDashboard/self-assessment/depression">
          <h2>Depression Test</h2>
          <p>Assess your mood and outlook</p>
        </Link>
        <Link className="test-card" to="/userDashboard/self-assessment/anxiety">
          <h2>Anxiety Test</h2>
          <p>Evaluate your anxiety symptoms</p>
        </Link>
        <Link className="test-card" to="/userDashboard/self-assessment/adhd">
          <h2>ADHD Test</h2>
          <p>Check for signs of ADHD</p>
        </Link>
        <Link className="test-card" to="/userDashboard/self-assessment/stress">
          <h2>Stress Test</h2>
          <p>Understand how stress affects you daily</p>
        </Link>

        <Link className="test-card" to="/userDashboard/self-assessment/sleep">
          <h2>Sleep Quality Test</h2>
          <p>Evaluate your sleep patterns and restfulness</p>
        </Link>

        <Link className="test-card" to="/userDashboard/self-assessment/social">
          <h2>Social Anxiety Test</h2>
          <p>Analyze comfort levels in social environments</p>
        </Link>

        <Link className="test-card" to="/userDashboard/self-assessment/esteem">
          <h2>Self-Esteem Test</h2>
          <p>Explore your confidence and self-worth</p>
        </Link>

      </div>
    </div>
  );
};

export default SelfAssessmentTests;
