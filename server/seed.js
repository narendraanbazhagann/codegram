const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./models/Problem');

dotenv.config();

const problems = [
    {
        title: "Two Sum",
        description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.",
        difficulty: "Easy",
        topic: "Arrays",
        templateCode: "function twoSum(nums, target) {\n  // Your code here\n}",
        testCases: [
            { input: "[2,7,11,15], 9", expectedOutput: "[0,1]", isHidden: false },
            { input: "[3,2,4], 6", expectedOutput: "[1,2]", isHidden: false }
        ],
        points: 10
    },
    {
        title: "Reverse String",
        description: "Write a function that reverses a string. The input string is given as an array of characters `s`.",
        difficulty: "Easy",
        topic: "Strings",
        templateCode: "function reverseString(s) {\n  // Your code here\n}",
        testCases: [
            { input: "['h','e','l','l','o']", expectedOutput: "['o','l','l','e','h']", isHidden: false }
        ],
        points: 10
    },
    {
        title: "Max Subarray",
        description: "Find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
        difficulty: "Medium",
        topic: "Arrays",
        templateCode: "function maxSubArray(nums) {\n  // Your code here\n}",
        testCases: [
            { input: "[-2,1,-3,4,-1,2,1,-5,4]", expectedOutput: "6", isHidden: false }
        ],
        points: 20
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB for seeding...');

        await Problem.deleteMany({});
        await Problem.insertMany(problems);

        console.log('✅ Database seeded successfully!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding error:', err.message);
        process.exit(1);
    }
};

seedDB();
