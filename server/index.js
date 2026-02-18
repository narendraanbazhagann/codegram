const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // In production, specify the frontend URL
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/problems', require('./routes/problemRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('Codegram Backend is running...');
});

const matchmakingHandler = require('./sockets/matchmaking');
const battleHandler = require('./sockets/battle');

// Socket.io Real-time Logic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Register Handlers
    matchmakingHandler(io, socket);
    battleHandler(io, socket);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Database Connection (Background)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/codegram';
mongoose.connect(MONGO_URI)
    .then(() => console.log('✅ Connected to MongoDB'))
    .catch((err) => console.log('⚠️ MongoDB NOT connected (features may be limited)'));

// Server Start
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
    console.log(`🚀 Server listening on port ${PORT}`);
});
