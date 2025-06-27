const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
        user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User schema
    },
});

module.exports= mongoose.model('Post', postSchema);


