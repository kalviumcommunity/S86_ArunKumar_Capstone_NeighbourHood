const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/routes'); 
const Post = require('./models/schema');
require('dotenv').config();

const app = express();



// Middleware to parse JSON
app.use(express.json());

// Prefix all routes with '/api'
app.use('/api', routes);

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


app.get('/',(req,res)=>{
    res.send("server is running");
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

