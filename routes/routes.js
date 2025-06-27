const express = require('express');
const router = express.Router();
const Post = require('../models/schema');
const User = require('../models/user');

// Create a new post and associate with a user
router.post('/posts', async (req, res) => {
    const { title, description, userId } = req.body;

    if (!title || !description || !userId) {
        return res.status(400).json({ message: "Title, description, and userId are required." });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const newPost = new Post({ title, description, user: userId });
        await newPost.save();

        user.posts.push(newPost._id);
        await user.save();

        res.status(201).json({ message: "Post created successfully.", post: newPost });
    } catch (error) {
        res.status(500).json({ message: "Error creating post.", error });
    }
});

// Fetch all posts with user details
router.get('/posts', async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'name email');
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: "Error fetching posts.", error });
    }
});

// Fetch a specific post by ID with user details
router.get('/posts/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('user', 'name email');
        if (!post) {
            return res.status(404).json({ message: "Post not found." });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: "Error fetching post.", error });
    }
});

module.exports = router;
