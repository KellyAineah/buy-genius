import React, { useState } from 'react';
import { addProduct } from '../Components/api.js';

const ProductForm = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [deliveryCost, setDeliveryCost] = useState('');
  const [paymentMode, setPaymentMode] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price: parseFloat(price),
      description,
      delivery_cost: parseFloat(deliveryCost),
      payment_mode: paymentMode,
      category_id: parseInt(categoryId),
      image_url: imageUrl
    };

    addProduct(productData)
      .then((response) => {
        onSuccess();
      })
      .catch((error) => {
        console.error('Failed to add product:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
      </label>
      <label>
        Description:
        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </label>
      <label>
        Delivery Cost:
        <input type="number" value={deliveryCost} onChange={(e) => setDeliveryCost(e.target.value)} required />
      </label>
      <label>
        Payment Mode:
        <input type="text" value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)} required />
      </label>
      <label>
        Category ID:
        <input type="number" value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required />
      </label>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;
