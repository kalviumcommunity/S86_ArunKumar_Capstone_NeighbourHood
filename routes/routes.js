const express = require('express');
const router = express.Router();
const Post = require('../models/schema'); // Adjust path as necessary

// GET all posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find(); // Fetch all posts from the database
        res.json(posts);
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// GET post by ID
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id); // Fetch a specific post by ID
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.json(post);
    } catch (error) {
        console.error("Error fetching the post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// POST a new post
router.post('/posts', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // Create and save a new post
        const newPost = new Post({ title, description });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        console.error("Error creating the post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// PUT - Update an existing post by ID
router.put('/posts/:id', async (req, res) => {
    try {
        const { title, description } = req.body;

        // Validate input
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // Find and update the post
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            { title, description },
            { new: true } // Return the updated document
        );

        if (!updatedPost) return res.status(404).json({ message: "Post not found" });

        res.json({ message: "Post updated successfully", post: updatedPost });
    } catch (error) {
        console.error("Error updating the post:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
