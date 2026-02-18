const queues = {
    'Arrays-Easy': [],
    'Arrays-Medium': [],
    'Arrays-Hard': [],
    'Strings-Easy': [],
    'Strings-Medium': [],
    'Strings-Hard': [],
    // Add more as needed
};

const handleMatchmaking = (io, socket) => {
    socket.on('join-queue', (data) => {
        const { topic, difficulty, user } = data;
        const queueKey = `${topic}-${difficulty}`;

        if (!queues[queueKey]) queues[queueKey] = [];

        // Check if user is already in queue
        if (queues[queueKey].find(p => p.userId === user._id)) return;

        console.log(`👤 ${user.username} joined ${queueKey} queue`);

        const player = {
            socketId: socket.id,
            userId: user._id,
            username: user.username,
            avatar: user.avatar
        };

        queues[queueKey].push(player);

        // Check for match
        if (queues[queueKey].length >= 2) {
            const player1 = queues[queueKey].shift();
            const player2 = queues[queueKey].shift();

            const battleId = `battle_${Date.now()}`;

            console.log(`⚔️ Match found! ${player1.username} vs ${player2.username}`);

            // Notify both players
            io.to(player1.socketId).emit('match-found', {
                battleId,
                opponent: player2
            });

            io.to(player2.socketId).emit('match-found', {
                battleId,
                opponent: player1
            });
        }
    });

    socket.on('leave-queue', (data) => {
        const { topic, difficulty, userId } = data;
        const queueKey = `${topic}-${difficulty}`;
        if (queues[queueKey]) {
            queues[queueKey] = queues[queueKey].filter(p => p.userId !== userId);
            console.log(`👤 User ${userId} left ${queueKey} queue`);
        }
    });
};

module.exports = handleMatchmaking;
