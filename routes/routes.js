const express = require('express');
const router = express.Router();

// Dummy data
const posts = [
    { id: 3, title: "Need help with gardening", description: "Looking for tools." },
    { id: 4, title: "Offering free tutoring", description: "Math and Science for grades 6-8." }
];

// GET all posts
router.get('/posts', (req, res) => {
    res.json(posts);
});

// GET post by ID
router.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send('Post not found');
    res.json(post);
});

// POST a new post
router.post('/posts', (req, res) => {
    const { title, description } = req.body;

    // Validate request body
    if (!title || !description) {
        return res.status(400).json({ message: "Title and description are required." });
    }

    // Create new post
    const newPost = {
        id: posts.length ? posts[posts.length - 1].id + 1 : 1, // Generate ID dynamically
        title,
        description
    };

    posts.push(newPost); // Add new post to the array
    res.status(201).json(newPost); // Return the created post
});

// PUT - Update an existing post by ID
router.put('/posts/:id', (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, description } = req.body;

        // Find the post by ID
        const postIndex = posts.findIndex(p => p.id === postId);
        if (postIndex === -1) {
            return res.status(404).json({ message: "Post not found." });
        }

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // Update the post
        posts[postIndex] = { id: postId, title, description };
        res.status(200).json({ message: "Post updated successfully.", post: posts[postIndex] });
    } catch (error) {
        console.error("Error in PUT /posts/:id:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});

module.exports = router;
