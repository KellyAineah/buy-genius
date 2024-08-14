import React, { useEffect, useState } from 'react';
import { fetchMessages } from './api';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const messagesData = await fetchMessages(); // Fetch messages from the API
        setMessages(messagesData); // Update state with fetched messages
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again later.');
      } finally {
        setLoading(false); // Stop loading whether success or error
      }
    };

    loadMessages(); // Call function to load messages on component mount
  }, []);

  if (loading) {
    return <p>Loading messages...</p>; // Show loading message while fetching
  }

  if (error) {
    return <p>{error}</p>; // Show error message if fetching fails
  }

  return (
    <div>
      <h2>Messages</h2>
      {messages.length === 0 ? (
        <p>No messages available.</p> // Show message if no messages are available
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message.id}>
              <p><strong>From:</strong> {message.sender}</p>
              <p>{message.content}</p>
              <p><em>{new Intl.DateTimeFormat('en-US', {
                  dateStyle: 'medium',
                  timeStyle: 'short',
                }).format(new Date(message.timestamp))}</em></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Messages;
