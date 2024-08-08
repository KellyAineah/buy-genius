import React from 'react';
import { FaBullseye, FaGift, FaThumbsUp } from 'react-icons/fa';
import './About.css';
import { SplitText } from './SplitText';

const About = ({ theme }) => {
  return (
    <div className={`about-container ${theme}`}>
      <div className="about-header">
        <h1>About BuyGenius</h1>
        <p>Discover more about us and our commitment to delivering the best shopping experience.</p>
        
      </div>
      <div className="about-cards">
        <div className="card">
          <FaBullseye className="card-icon" />
          <SplitText text="Our Mission" className="custom-class" delay={30} />
          
          <p>
            At BuyGenius, our mission is to revolutionize the shopping experience by offering high-quality products at competitive prices. We aim to make shopping easier, more enjoyable, and more convenient for our customers.
          </p>
        </div>
        <div className="card">
          <FaGift className="card-icon" />
          <SplitText text="What We Offer" className="custom-class" delay={30} />
          <p>
            We provide a wide range of products from various categories including electronics, fashion, home essentials, and more. Our platform connects you with top retailers to ensure you get the best deals and the latest products.
          </p>
        </div>
        <div className="card">
          <FaThumbsUp className="card-icon" />
          <SplitText text="Why Choose Us" className="custom-class" delay={30} />
          
          <p>
            With a user-friendly interface, secure payment options, and reliable customer service, BuyGenius is your go-to destination for all your shopping needs. Join us and experience the future of shopping today!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
