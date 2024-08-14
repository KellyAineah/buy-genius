import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { sendMessage, fetchMessages } from './api'; 
import './ProductModal.css';

const ProductModal = ({ product, onClose }) => {
  const { user } = useContext(AuthContext);
  const [messageContent, setMessageContent] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showMessages, setShowMessages] = useState(false);
  const [messages, setMessages] = 
  useState([]);

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
        setMessages([...messages, response]);
        setMessageContent('');
        setErrorMessage('');
      })
      .catch(error => {
        console.error('Failed to send message:', error);
        setErrorMessage('Failed to send message. Please try again.');
      });
  };

  const handleToggleMessages = () => {
    if (!showMessages) {
      // Fetch messages when the chatbox is opened
      fetchMessages(product.retailer.user_id)
        .then(data => setMessages(data))
        .catch(error => console.error('Failed to fetch messages:', error));
    }
    setShowMessages(!showMessages);
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
          <>
            <button onClick={handleToggleMessages} className="message-button">
              {showMessages ? "Close Chat" : "Message"}
            </button>

            {showMessages && (
              <div className="chatbox">
                <div className="messages-list">
                  {messages.map((message, index) => (
                    <div key={index} className={`message ${message.sender_id === user.id ? 'sent' : 'received'}`}>
                      <p>{message.content}</p>
                    </div>
                  ))}
                </div>
                <form onSubmit={handleSendMessage} className="message-form">
                  <textarea
                    value={messageContent}
                    onChange={(e) => setMessageContent(e.target.value)}
                    placeholder="Write your message here"
                    required
                  />
                  <button type="submit">Send</button>
                </form>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
              </div>
            )}
          </>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default ProductModal;
