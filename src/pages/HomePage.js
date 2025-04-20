import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../css/HomePage.css';

import heroImage from '../img/Mental health-bro.png';
import feature1 from '../img/Feeling Blue-amico.svg';
import feature2 from '../img/Questions-pana.svg';
import feature3 from '../img/Book lover-bro.svg';

const featureData = [
  {
    title: 'Mood Tracker',
    description: 'Track your emotions daily with our visual mood board and personalized insights.',
    image: feature1,
    alt: 'Mood Tracker Illustration',
  },
  {
    title: 'Therapist Directory',
    description: 'Find licensed professionals based on your needs, and book an appointment with ease.',
    image: feature2,
    alt: 'Therapist Directory Illustration',
  },
  {
    title: 'Self-Help Library',
    description: 'Explore mental wellness content curated by professionals, for YOU.',
    image: feature3,
    alt: 'Self-Help Library Illustration',
  },
];

const pricingPlans = [
  {
    title: 'Free Plan',
    description: 'Mood logs, limited chatbot access.',
    price: 'Free',
  },
  {
    title: 'Premium',
    description: 'Unlimited features + deeper insights.',
    price: '$10/mo',
  },
  {
    title: 'Family Pack',
    description: 'Access for 5 users in one household.',
    price: '$150/year',
  },
];

const HomePage = () => {
  return (
    <div className="homepage">

      {/* === HERO SECTION === */}
      <section className="hero-section">
        <motion.div
          className="hero-text"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1>
            Feel Better, <span>One Click</span> at a Time
          </h1>
          <p>
            Your mental health journey starts here. Track moods, book therapists, and chat with our AI.
          </p>
          <Link to="/signup" className="start-btn" aria-label="Start Now Button">
            Start Now
          </Link>
        </motion.div>

        <motion.div
          className="hero-image"
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img src={heroImage} alt="Meditation Illustration" />
        </motion.div>
      </section>

      {/* === FEATURES ZIG-ZAG === */}
      <section className="features-zigzag">
        {featureData.map((feature, index) => (
          <motion.div
            key={index}
            className={`feature-row ${index % 2 !== 0 ? 'reverse' : ''}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <div className="text">
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </div>
            <div className="image">
              <img src={feature.image} alt={feature.alt} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* === GLASSMORPHIC PRICING CARDS === */}
      <section className="pricing-section">
        <h2 className="section-header">Pricing Plans</h2>
        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              className="glass-card"
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <h3>{plan.title}</h3>
              <p>{plan.description}</p>
              <span>{plan.price}</span>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="security-section">
      
        <h2>Your Data is Safe</h2>
        <p>
          Your mental health information is encrypted, securely stored, and never shared. We comply with international data protection standards to ensure your privacy is our top priority.
        </p>
      </section>
      {/* === FLOATING HELP BUTTON === */}
      <Link
        to="/book-therapist"
        className="floating-help-btn"
        aria-label="Floating Help Button"
      >
        Get Help Now 💬
      </Link>
      <section className="crisis-section">
        <h2>Are You in Crisis?</h2>
        <p>We’re here for you. If you need immediate support, don’t wait. Click below to access emergency resources or chat with a professional.</p>
        <div className="crisis-actions">
          <Link to="/userdashboard?tab=CRISIS" className="crisis-button">Get Crisis Help</Link>
        </div>
</section>
    </div>
    
  );
};

export default HomePage;
