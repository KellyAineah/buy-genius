import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { sendMessage } from './api'; 
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { user } = useContext(AuthContext);
  const [messageContent, setMessageContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!user) {
      setErrorMessage('You need to log in to send a message.');
      return;
    }

    const messageData = {
      receiver_id: product.retailer.user_id, 
      product_id: product.id,
      content: messageContent,
    };

    sendMessage(messageData)
      .then(response => {
        console.log('Message sent:', response);
        setMessageContent('');
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Failed to send message:', error);
        setErrorMessage('Failed to send message. Please try again.');
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

        {user && !user.is_retailer ? (
          <form onSubmit={handleSendMessage} className="message-form">
            <textarea
              value={messageContent}
              onChange={(e) => setMessageContent(e.target.value)}
              placeholder="Write your message here"
              required
            />
            <button type="submit">Send Message</button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
