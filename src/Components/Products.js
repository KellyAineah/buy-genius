import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../Components/api.js';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchAllProducts()
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          setProducts([]); 
        }
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setProducts([]); 
      });
  }, []);

  return (
    <div className="products">
      <h2>Explore Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default Products;
