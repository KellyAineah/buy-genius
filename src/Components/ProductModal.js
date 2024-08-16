import React from 'react';
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const retailerName = product?.retailer_name || 'the retailer';
  const whatsappNumber = product?.retailer_whatsapp;

  const whatsappLink = whatsappNumber 
    ? `https://wa.me/${whatsappNumber}?text=Hello%20${retailerName}%2C%20I'm%20interested%20in%20your%20product%3A%20${product.name}%20priced%20at%20${product.price}.`
    : null;

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
        <p>Retailer: {retailerName}</p>

        {whatsappLink ? (
          <a
            href={whatsappLink}
            className="whatsapp-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Retailer on WhatsApp
          </a>
        ) : (
          <p>The retailer has not provided a WhatsApp number.</p>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
