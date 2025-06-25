const express = require('express');
const app = express();
const routes = require('./routes'); // Adjust the path to the actual location of routes.js

// Middleware to parse JSON
app.use(express.json());

// Prefix all routes with '/api'
app.use('/api', routes);

const PORT = process.env.PORT || 3000;


app.get('/',(req,res)=>{
    res.send("server is running");
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

