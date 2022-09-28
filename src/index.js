const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const productRoutes = require('./routes/product');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 9000;

app.use(cors())
app.use( express.json());
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


// routes
app.get('/', (req, res) => {
    res.send('Bienvenido a mi API')
})

// mongodb conection
mongoose.connect( process.env.MONGODB_URI )
.then( () => console.log('Conectado a MongoDB Atlas'))
.catch( err => console.error(err));

app.listen( port, () => console.log(`Servidor escuchando en puerto: ${port}`));