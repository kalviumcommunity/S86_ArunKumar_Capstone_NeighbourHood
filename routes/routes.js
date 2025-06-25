const express = require('express');
const router = express.Router();

// Dummy data
const posts = [
    { id: 3, title: "Need help with gardening", description: "Looking for tools." },
    { id: 4, title: "Offering free tutoring", description: "Math and Science for grades 6-8." }
];

// POST a new post
router.post('/posts', (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate request body
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        const newPost = {
            id: posts.length ? posts[posts.length - 1].id + 1 : 1,
            title,
            description
        };

        posts.push(newPost);
        res.status(201).json(newPost);
    } catch (error) {
        console.error("Error in POST /posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
