import React, { useState, useEffect } from 'react';
import { fetchAllProducts, fetchAllCategories, recordSearchHistory } from './api.js';
import './Products.css';
import ProductModal from './ProductModal';

const Products = ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchAllProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setProducts([]);
        setFilteredProducts([]);
      });

    fetchAllCategories()
      .then(data => setCategories(data))
      .catch(error => console.error('Failed to fetch categories:', error));
  }, []);

  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      recordSearchHistory(searchTerm)
        .then(response => console.log('Search history recorded:', response))
        .catch(error => console.error('Failed to record search history:', error));
    }

    if (selectedCategory) {
      filtered = filtered.filter(product =>
        product.category_id === parseInt(selectedCategory)
      );
    }

    filtered = filtered.map(product => {
      const marginalBenefit = calculateMB(product);
      const costBenefit = calculateCB(product);
      return { ...product, marginalBenefit, costBenefit };
    });

    filtered.sort((a, b) => 
      a.costBenefit - b.costBenefit || b.marginalBenefit - a.marginalBenefit
    );

    if ((searchTerm || selectedCategory) && filtered.length > 0) {
      filtered[0] = { ...filtered[0], recommended: true };
    }

    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const calculateMB = (product) => {
    return product.price;
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

  return (
    <div className={`products-container ${theme}`}>
      <div className="header-product">
        <h2>Explore Products</h2>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="filters-container">
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div className="product-card" key={product.id}>
              <img src={product.image_url} alt={product.name} className="product-image" />
              <h3>{product.name}</h3>
              <p>Price: Ksh.{product.price}</p>
              <p>Retailer: {product.retailer_name || 'Unknown'}</p> 
              {product.recommended && <button className="recommended-btn">Recommended</button>}
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
