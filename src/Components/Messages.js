import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import { fetchMessages, sendMessage } from './api';
//import './MessagingPage.css';

const Messages = () => {
  const { retailerId } = useParams();
  const { search } = useLocation();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const productId = new URLSearchParams(search).get('product');

  useEffect(() => {
    fetchMessages(retailerId)
      .then(data => setMessages(data))
      .catch(error => console.error('Failed to fetch messages:', error));
  }, [retailerId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!user) {
      alert('You need to log in to send a message.');
      return;
    }

    const messageData = {
      receiver_id: retailerId,
      product_id: productId,
      content: messageContent,
    };

    sendMessage(messageData)
      .then(response => {
        setMessages([...messages, response]);
        setMessageContent('');
      })
      .catch(error => console.error('Failed to send message:', error));
  };

  return (
    <div className="messaging-page-container">
      <h2>Contact Retailer</h2>
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
          placeholder="Type your message here"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Messages;
