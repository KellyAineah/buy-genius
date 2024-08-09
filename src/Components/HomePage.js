import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './HomePage.css';
import { useNavigate } from "react-router-dom";

const HomePage = ({ theme }) => {
    const navigate = useNavigate();

    const handleExploreClick = () => {
        navigate('/products');
    };

    return (
        <div className={`homepage-container ${theme}`}>
            <div className="landing-page">
                <div className="carousel-text">
                    <p className="custom-class">Discover the best deals on all popular online stores</p>
                    <p className="custom-class">Millions of products across multiple categories for all shopping needs</p>
                </div>
                <div className="carousel-container">
                    <Carousel
                        showArrows={false}
                        showStatus={false}
                        showThumbs={false}
                        infiniteLoop={true}
                        autoPlay={true}
                        interval={4000}
                        className="carousel"
                    >
                        <div>
                            <img src="https://images.pexels.com/photos/3769747/pexels-photo-3769747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Technology and Gadgets" />
                        </div>
                        <div>
                            <img src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f" alt="Fashion and Lifestyle" />
                        </div>
                        <div>
                            <img src="https://images.pexels.com/photos/5624985/pexels-photo-5624985.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Shopping Experience" />
                        </div>
                        <div>
                            <img src="https://images.pexels.com/photos/5632398/pexels-photo-5632398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Shopping Experience" />
                        </div>
                    </Carousel>
                </div>
                <button className="explore-button" onClick={handleExploreClick}>
                    Explore Products
                </button>
            </div>
        </div>
    );
};

export default HomePage;
