const express = require('express');
const router = express.Router();

// dummy data
const posts = [
    { id: 1, title: "Need help with gardening", description: "Looking for tools." },
    { id: 2, title: "Offering free tutoring", description: "Math and Science for grades 6-8." }
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

module.exports = router;
