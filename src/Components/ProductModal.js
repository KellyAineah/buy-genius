import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { sendMessage } from './api'; // Ensure this path matches your actual path
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { user } = useContext(AuthContext);
  const [messageContent, setMessageContent] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    const messageData = {
      receiver_id: product.retailer.user_id, // Ensure this is correct
      product_id: product.id,
      content: messageContent,
    };

    sendMessage(messageData)
      .then(response => {
        console.log('Message sent:', response);
        setMessageContent('');
      })
      .catch(error => {
        console.error('Failed to send message:', error);
      });
  };

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

        {user && !user.is_retailer && (
          <form onSubmit={handleSendMessage} className="message-form">
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Write your message here"
              required
            />
            <button type="submit">Send Message</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
