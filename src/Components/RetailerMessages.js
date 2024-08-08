import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { fetchMessages, sendMessage } from '../api';
//import './RetailerMessages.css';

const RetailerMessages = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    fetchMessages(user.id)
      .then(response => {
        setMessages(response);
      })
      .catch(error => {
        console.error('Failed to fetch messages:', error);
      });
  }, [user.id]);

  const handleReply = (receiverId, productId) => {
    const replyData = {
      receiver_id: receiverId,
      product_id: productId,
      content: replyContent,
    };

    sendMessage(replyData)
      .then(response => {
        console.log('Reply sent:', response);
        setReplyContent('');
        // Optionally update the messages list
      })
      .catch(error => {
        console.error('Failed to send reply:', error);
      });
  };

  return (
    <div className="retailer-messages">
      <h3>Messages</h3>
      {messages.map(message => (
        <div key={message.id} className="message-item">
          <p><strong>From:</strong> {message.sender.username}</p>
          <p><strong>Message:</strong> {message.content}</p>
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Write your reply here"
            required
          />
          <button onClick={() => handleReply(message.sender_id, message.product_id)}>Reply</button>
        </div>
      ))}
    </div>
  );
};

export default RetailerMessages;
