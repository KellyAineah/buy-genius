import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../Components/api.js';
import './Products.css';
import ProductModal from './ProductModal';

const Products = ({ theme }) => {  // Pass theme as a prop
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchAllProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data); // Initialize filteredProducts with all products
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = products
        .filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(product => {
          const marginalBenefit = calculateMB(product);
          const costBenefit = calculateCB(product);
          return { ...product, marginalBenefit, costBenefit };
        });

      filtered.sort((a, b) => b.marginalBenefit - a.marginalBenefit || b.costBenefit - a.costBenefit);

      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products); // Reset to all products when search term is cleared
    }
  }, [searchTerm, products]);

  const calculateMB = (product) => {
    return product.price;  // Adjusted since you don't have ratings
  };

  const calculateCB = (product) => {
    return product.price + product.delivery_cost;
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className={`products-container ${theme}`}>
      <div className="header-product">
        <h2>Explore Products</h2>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-bar"
        />
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image_url} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Price: Ksh.{product.price}</p>
              <button className="more-details-btn" onClick={() => handleCardClick(product)}>See More Details</button>
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
      {isModalOpen && selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default Products;
