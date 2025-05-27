import React from 'react';
import { FaBullseye, FaGift, FaThumbsUp, FaRocket, FaShieldAlt, FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './About.css';

const About = ({ theme }) => {
  const cardVariants = {
    offscreen: {
      y: 100,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const stats = [
    { value: "10,000+", label: "Products", icon: <FaGift /> },
    { value: "500+", label: "Brands", icon: <FaShieldAlt /> },
    { value: "10K+", label: "Happy Customers", icon: <FaHeart /> }
  ];

  return (
    <div className={`about-container ${theme}`}>
      {/* Hero Section */}
      <motion.section 
        className="about-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="hero-content">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About <span>BuyGenius</span>
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Revolutionizing your shopping experience with intelligence and care
          </motion.p>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.div 
        className="stats-section"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div 
              key={index}
              className="stat-card"
              variants={cardVariants}
              custom={index}
            >
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="about-content">
        <motion.div 
          className="about-cards"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div 
            className="card"
            variants={cardVariants}
          >
            <div className="card-header">
              <FaBullseye className="card-icon" />
              <h2>Our Mission</h2>
              <div className="card-decoration"></div>
            </div>
            <p>
              At BuyGenius, our mission is to revolutionize the shopping experience by offering high-quality products at competitive prices. We aim to make shopping easier, more enjoyable, and more convenient for our customers.
            </p>
          </motion.div>

          <motion.div 
            className="card"
            variants={cardVariants}
          >
            <div className="card-header">
              <FaRocket className="card-icon" />
              <h2>What We Offer</h2>
              <div className="card-decoration"></div>
            </div>
            <p>
              We provide a wide range of products from various categories including electronics, fashion, home essentials, and more. Our platform connects you with top retailers to ensure you get the best deals and the latest products.
            </p>
          </motion.div>

          <motion.div 
            className="card"
            variants={cardVariants}
          >
            <div className="card-header">
              <FaThumbsUp className="card-icon" />
              <h2>Why Choose Us</h2>
              <div className="card-decoration"></div>
            </div>
            <p>
              With a user-friendly interface, secure payment options, and reliable customer service, BuyGenius is your go-to destination for all your shopping needs. Join us and experience the future of shopping today!
            </p>
          </motion.div>
        </motion.div>

        {/* Team Section */}
        <motion.section 
          className="team-section"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2>Meet Our Team</h2>
          <p className="team-subtitle">The brilliant minds behind BuyGenius</p>
          <div className="team-grid">
            {/* Team members would go here */}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default About;