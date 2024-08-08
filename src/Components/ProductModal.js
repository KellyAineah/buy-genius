import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <img src={product.image_url} alt={product.name} className="product-image" />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>Price: {product.price}</p>
        <p>Delivery Cost: {product.delivery_cost}</p>
        <p>Payment Mode: {product.payment_mode}</p>
        <p>Retailer: {product.retailer_name}</p> 
      </div>
    </div>
  );
};

export default ProductModal;
