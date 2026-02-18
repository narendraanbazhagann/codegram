const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
    input: { type: String, required: true },
    expectedOutput: { type: String, required: true },
    isHidden: { type: Boolean, default: false }
});

const problemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard'],
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    templateCode: {
        type: String, // e.g., "function solution(n) { \n\n }"
        required: true
    },
    testCases: [testCaseSchema],
    timeLimit: { type: Number, default: 1000 }, // ms
    memoryLimit: { type: Number, default: 256 }, // mb
    points: { type: Number, default: 10 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Problem', problemSchema);
