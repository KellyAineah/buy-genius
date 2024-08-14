import io from 'socket.io-client';

// Initialize socket.io client with WebSocket transport
const socket = io('http://localhost:5000', {
  transports: ['websocket'], // Force WebSocket
});

socket.on('connect', () => {
  console.log('Connected to Socket.IO server');
});

socket.on('disconnect', () => {
  console.log('Disconnected from Socket.IO server');
});

export default socket;
