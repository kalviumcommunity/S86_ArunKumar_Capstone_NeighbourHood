const express = require('express');
const app = express();
const getRoutes = require('./routes/get');

app.use(express.json());
app.use('/api', getRoutes);


const PORT =3000;
app.get('/',(req,res)=>{
    res.send("server is running");
})
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
