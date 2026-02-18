const battles = {}; // Store active battle state

const handleBattle = (io, socket) => {
    socket.on('join-battle', (battleId) => {
        socket.join(battleId);
        console.log(`⚔️ User ${socket.id} joined battle ${battleId}`);

        if (!battles[battleId]) {
            battles[battleId] = {
                players: {},
                startTime: Date.now()
            };
        }

        // Add player to battle state
        battles[battleId].players[socket.id] = {
            progress: 0,
            status: 'coding'
        };
    });

    socket.on('code-update', (data) => {
        const { battleId, code } = data;
        // Broadcast code to opponent only (not self)
        socket.to(battleId).emit('opponent-code', { code });
    });

    socket.on('test-passed', (data) => {
        const { battleId, passedCount, totalCount } = data;
        const progress = Math.round((passedCount / totalCount) * 100);

        if (battles[battleId]) {
            battles[battleId].players[socket.id].progress = progress;
        }

        // Notify opponent of progress
        socket.to(battleId).emit('opponent-progress', { progress });
    });

    socket.on('submit-solution', (data) => {
        const { battleId, success } = data;
        if (success) {
            console.log(`🏆 Winner in ${battleId}: ${socket.id}`);
            io.in(battleId).emit('battle-ended', {
                winner: socket.id,
                message: 'A player has solved the problem!'
            });
            // Cleanup battle after some time
            setTimeout(() => delete battles[battleId], 10000);
        }
    });

    socket.on('leave-battle', (battleId) => {
        socket.leave(battleId);
        if (battles[battleId]) {
            delete battles[battleId].players[socket.id];
            if (Object.keys(battles[battleId].players).length === 0) {
                delete battles[battleId];
            }
        }
    });
};

module.exports = handleBattle;
