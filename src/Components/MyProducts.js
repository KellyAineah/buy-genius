import React, { useState, useEffect } from 'react';
import { fetchMyProducts, deleteProduct } from '../Components/api.js';
import ProductForm from './ProductForm';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyProducts.css'

const MyProducts = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
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
        toast.error('Failed to load products. Please try again later.');
        setProducts([]); 
      });
  };

  const handleDelete = (productId) => {
    deleteProduct(productId)
      .then(() => {
        setProducts(products.filter(product => product.id !== productId));
        toast.success('Product deleted successfully.');
      })
      .catch(error => {
        console.error('Failed to delete product:', error);
        toast.error('Failed to delete product. Please try again later.');
      });
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSuccess = () => {
    setEditingProduct(null);
    loadProducts();
    toast.success(editingProduct && editingProduct.id ? 'Product updated successfully.' : 'Product added successfully.');
  };

  return (
    <div className="my-products">
      <h2>My Products</h2>
      <button onClick={() => setEditingProduct({})}>Add New Product</button>
      {editingProduct && (
        <ProductForm 
          initialProduct={editingProduct} 
          onSuccess={handleSuccess} 
          isEdit={!!editingProduct.id}
          key={editingProduct.id} 
        />
      )}
      {products.length > 0 ? (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <h3>{product.name}</h3>
              <img src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px' }} />
              <p>{product.description}</p>
              <p>Price: Ksh.{product.price}</p>
              <p>Delivery Cost: Ksh.{product.delivery_cost}</p>
              <p>Payment Mode: {product.payment_mode}</p>
              <p>Category ID: {product.category_id}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default MyProducts;
