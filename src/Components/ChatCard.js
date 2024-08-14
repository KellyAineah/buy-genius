import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './ChatCard.css'; // For modal styling

// Connect to the Flask server's socket.io instance
const socket = io('http://127.0.0.1:5000');

function ChatCard({ retailerName, retailerId, userId, onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isOpen, setIsOpen] = useState(true); // Modal is open by default
  const [messageStatus, setMessageStatus] = useState({}); // Track message status

  // Establish socket connection and listen for incoming messages
  useEffect(() => {
    socket.on('response', (data) => {
      setMessages((prevMessages) => [...prevMessages, `${data.sender}: ${data.message}`]);
    });

    // Handle message acknowledgment
    socket.on('message_ack', (data) => {
      setMessageStatus((prevStatus) => ({
        ...prevStatus,
        [data.messageId]: data.status,
      }));
    });

    return () => {
      socket.off('response'); // Cleanup on unmount
      socket.off('message_ack'); // Cleanup on unmount
    };
  }, []);

  // Emit a new message to the server
  const sendMessage = () => {
    if (input.trim() !== '') {
      const messageId = new Date().getTime(); // Unique ID for the message
      const messageData = {
        message: input,
        senderId: userId,
        receiverId: retailerId,
        messageId, // Include the message ID
      };

      socket.emit('message', messageData);
      setMessages((prevMessages) => [...prevMessages, `You: ${input}`]);
      setMessageStatus((prevStatus) => ({
        ...prevStatus,
        [messageId]: 'sending',
      }));
      setInput('');
    }
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      onClose();  // Close the modal if the state changes
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>&times;</span>
            <h2>Chatting with {retailerName}</h2>
            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div key={index}>
                  {msg}
                  {messageStatus[msg.messageId] === 'sending' && ' (Sending...)'}
                  {messageStatus[msg.messageId] === 'sent' && ' (Sent)'}
                </div>
              ))}
            </div>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()} // Send on Enter key
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatCard;
