import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import './HomePage.css';

const HomePage = ({ theme }) => {
    const navigate = useNavigate();

    const featureCards = [
        {
            title: "Best Deals",
            description: "Find the hottest deals across all major retailers",
            icon: "💰",
            bgColor: theme === "dark" ? "#2a2a3a" : "#FF6B6B",
            textColor: theme === "dark" ? "#ffffff" : "#000000"
        },
        {
            title: "Price Comparison",
            description: "Compare prices across different stores instantly",
            icon: "⚖️",
            bgColor: theme === "dark" ? "#1e3a5f" : "#4ECDC4",
            textColor: theme === "dark" ? "#ffffff" : "#000000"
        },
        {
            title: "Trending Products",
            description: "Discover what's popular right now",
            icon: "🔥",
            bgColor: theme === "dark" ? "#5c2c0d" : "#FFD166",
            textColor: theme === "dark" ? "#ffffff" : "#000000"
        },
        {
            title: "Smart Recommendations",
            description: "Get personalized product suggestions",
            icon: "🤖",
            bgColor: theme === "dark" ? "#0d4d6b" : "#A5D8FF",
            textColor: theme === "dark" ? "#ffffff" : "#000000"
        }
    ];

    const handleExploreClick = () => {
        navigate('/products');
    };

    const renderAnimatedText = (text) => {
        return text.split("").map((letter, index) => (
            <motion.span 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 100
                }}
                className="animated-letter"
                style={letter === " " ? { width: "1rem" } : {}}
            >
                {letter}
            </motion.span>
        ));
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

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

    return (
        <div className={`homepage-wrapper ${theme}`}>
            {/* Hero Section */}
            <div className={`homepage-hero ${theme}`}>
                <div className="carousel-container">
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={5000}
                        className="carousel"
                    >
                        <div className="carousel-slide">
                            <img src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Technology and Gadgets" />
                        </div>
                        <div className="carousel-slide">
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" alt="Fashion and Lifestyle" />
                        </div>
                        <div className="carousel-slide">
                            <img src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Shopping Experience" />
                        </div>
                        <div className="carousel-slide">
                            <img src="https://focus.independent.ie/thumbor/MlmwfUJJPTa4s-oMQddFvSyLfUQ=/0x42:2001x1377/960x640/prod-mh-ireland/ec9b6be5-a449-4ccf-afd9-5d7b01f0a07d/045a5b62-b9f0-4996-982c-fb119afd9e3c/confused%20consumer.jpg" alt="Shopping Experience" />
                        </div>
                    </Carousel>
                </div>
                
                <motion.div 
                    className={`content-overlay ${theme}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <motion.div 
                        className="landing-page-content"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.h1 className={`main-heading ${theme}`} variants={itemVariants}>
                            {renderAnimatedText("Welcome to BuyGenius.")}
                        </motion.h1>
                        <motion.p className={theme} variants={itemVariants}>
                            Discover the best deals across all popular online stores.
                        </motion.p>
                        <motion.p className={theme} variants={itemVariants}>
                            Millions of products across multiple categories for all your shopping needs.
                        </motion.p>
                        <motion.div 
                            className="explore-container"
                            variants={itemVariants}
                        >
                            <motion.button 
                                className={`explore-button ${theme}`} 
                                onClick={handleExploreClick}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Explore Products
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* Cards Section */}
            <motion.div 
                className={`feature-cards-section ${theme}`}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, margin: "-100px" }}
            >
                <motion.h2 
                    className={`feature-cards-title ${theme}`}
                    variants={cardVariants}
                >
                    Why Choose BuyGenius?
                </motion.h2>
                <div className="feature-cards-grid">
                    {featureCards.map((card, index) => (
                        <motion.div 
                            key={index}
                            className={`feature-card ${theme}`}
                            style={{ 
                                backgroundColor: card.bgColor,
                                color: card.textColor
                            }}
                            onClick={() => navigate('/products')}
                            variants={cardVariants}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="card-icon">{card.icon}</div>
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default HomePage;