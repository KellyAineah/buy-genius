import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useNavigate } from "react-router-dom";
import './HomePage.css';

const HomePage = ({ theme }) => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/products');
    };

    const renderAnimatedText = (text) => {
        return text.split("").map((letter, index) => (
            <span 
                key={index} 
                className="animated-letter"
                style={letter === " " ? { width: "1rem" } : {}}
            >
                {letter}
            </span>
        ));
    };

    return (
        <div className={`homepage-container ${theme}`}>
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
            <div className="content-overlay">
                <div className="landing-page-content">
                    <h1 className="main-heading">
                        {renderAnimatedText("Welcome to BuyGenius.")}
                    </h1>
                    <p>Discover the best deals across all popular online stores.</p>
                    <p>Millions of products across multiple categories for all your shopping needs.</p>
                    <div className="explore-container">
                        <button className="explore-button" onClick={handleExploreClick}>
                            Explore Products
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
