import React, { useState, useEffect } from 'react';
import { fetchMyProducts, deleteProduct } from '../Components/api.js';
import ProductForm from './ProductForm';

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);

  useEffect(() => {
    fetchMyProducts()
      .then(data => {
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          setProducts([]); 
        }
      })
      .catch(error => {
        console.error('Failed to fetch products:', error);
        setProducts([]); 
      });
  }, []);

  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        setProducts(products.filter(product => product.id !== productId));
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
      });
  };

  const handleSuccess = () => {
    setEditingProductId(null);
    fetchMyProducts().then(data => {
      if (Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    });
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      <button onClick={() => setEditingProductId(null)}>Add New Product</button>
      {editingProductId !== null && (
        <ProductForm productId={editingProductId} onSuccess={handleSuccess} />
      )}
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <button onClick={() => setEditingProductId(product.id)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default MyProducts;
