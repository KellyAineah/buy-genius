import React, { useState, useEffect } from 'react';
import { addProduct, updateProduct, fetchCategories } from '../Components/api.js';
import './ProductForm.css'

const ProductForm = ({ initialProduct = {}, onSuccess, isEdit = false }) => {
  const [name, setName] = useState(initialProduct.name || '');
  const [price, setPrice] = useState(initialProduct.price || '');
  const [description, setDescription] = useState(initialProduct.description || '');
  const [deliveryCost, setDeliveryCost] = useState(initialProduct.delivery_cost || '');
  const [paymentMode, setPaymentMode] = useState(initialProduct.payment_mode || '');
  const [categoryId, setCategoryId] = useState(initialProduct.category_id || '');
  const [imageUrl, setImageUrl] = useState(initialProduct.image_url || '');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories()
      .then(data => {
        setCategories(data);
        if (!initialProduct.category_id && data.length > 0) {
          setCategoryId(data[0].id);
        }
      })
      .catch(error => {
        console.error('Failed to fetch categories:', error);
      });
  }, [initialProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name,
      price: parseFloat(price),
      description,
      delivery_cost: parseFloat(deliveryCost),
      payment_mode: paymentMode,
      category_id: parseInt(categoryId),
      image_url: imageUrl,
    };

    if (isEdit) {
      updateProduct(initialProduct.id, productData)
        .then(() => {
          onSuccess();
        })
        .catch((error) => {
          console.error('Failed to update product:', error);
        });
    } else {
      addProduct(productData)
        .then(() => {
          onSuccess();
        })
        .catch((error) => {
          console.error('Failed to add product:', error);
        });
    }
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
        Category:
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} required>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Image URL:
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
      </label>
      <button type="submit">{isEdit ? 'Update Product' : 'Add Product'}</button>
    </form>
  );
};

export default ProductForm;
