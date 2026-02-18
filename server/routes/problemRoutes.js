const express = require('express');
const router = express.Router();
const { getProblems, getProblemById, createProblem } = require('../controllers/problemController');

router.get('/', getProblems);
router.get('/:id', getProblemById);
router.post('/', createProblem);

module.exports = router;
