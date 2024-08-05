import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, fetchProduct } from '../Components/api.js';

const ProductForm = ({ productId, onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (productId) {
      fetchProduct(productId).then(product => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category_id);
        setImageUrl(product.image_url);
      });
    }
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const productData = { name, description, price, category_id: category, image_url: imageUrl };
    const action = productId ? updateProduct : addProduct;
    
    action(productId, productData).then(() => {
      onSuccess();
    }).catch(error => {
      console.error('Failed to save product:', error);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Category:
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
      </label>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">{productId ? 'Update' : 'Add'} Product</button>
    </form>
  );
};

export default ProductForm;
