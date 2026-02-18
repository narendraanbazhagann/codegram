const Problem = require('../models/Problem');

// @desc    Get all problems
// @route   GET /api/problems
exports.getProblems = async (req, res) => {
    try {
        const { topic, difficulty } = req.query;
        let query = {};

        if (topic) query.topic = topic;
        if (difficulty) query.difficulty = difficulty;

        const problems = await Problem.find(query);
        res.json(problems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get a single problem
// @route   GET /api/problems/:id
exports.getProblemById = async (req, res) => {
    try {
        const problem = await Problem.findById(req.params.id);
        if (problem) {
            res.json(problem);
        } else {
            res.status(404).json({ message: 'Problem not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add a new problem (Admin only)
// @route   POST /api/problems
exports.createProblem = async (req, res) => {
    try {
        const problem = await Problem.create(req.body);
        res.status(201).json(problem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
