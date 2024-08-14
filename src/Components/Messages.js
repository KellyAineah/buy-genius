import React, { useState, useEffect, useContext } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import socket from './socket';
import { fetchMessages, sendMessage } from './api';

const Messages = () => {
  const { retailerId } = useParams();
  const { search } = useLocation();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [messageContent, setMessageContent] = useState('');
  const productId = new URLSearchParams(search).get('product');

  useEffect(() => {
    // Fetch previous messages between user and retailer
    fetchMessages(retailerId)
      .then(data => setMessages(data))
      .catch(error => console.error('Failed to fetch messages:', error));

    // Handle real-time messages
    const handleMessage = (message) => {
      if (message.product_id === productId && message.sender_id === retailerId) {
        setMessages(prevMessages => [...prevMessages, message]);
      }
    };

    socket.on('message', handleMessage);

    return () => {
      socket.off('message', handleMessage);
    };
  }, [retailerId, productId]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (!user) {
      alert('You need to log in to send a message.');
      return;
    }

    const messageData = {
      receiver_id: retailerId,
      sender_id: user.id,
      product_id: productId,
      content: messageContent,
    };

    sendMessage(messageData)
      .then(response => {
        setMessages(prevMessages => [...prevMessages, response]);
        setMessageContent('');
        socket.emit('message', response);
      })
      .catch(error => console.error('Failed to send message:', error));
  };

  if (!user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <div className="messaging-page-container">
      <h2>{user.role === 'retailer' ? 'Customer Messages' : 'Contact Retailer'}</h2>
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
