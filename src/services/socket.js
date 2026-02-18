import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5002'; // Matching the backend port we just set

export const socket = io(SOCKET_URL, {
    autoConnect: false,
    reconnection: true,
});

export const connectSocket = (userId) => {
    if (!socket.connected) {
        socket.auth = { userId };
        socket.connect();
    }
};

export const disconnectSocket = () => {
    if (socket.connected) {
        socket.disconnect();
    }
};

export default socket;
