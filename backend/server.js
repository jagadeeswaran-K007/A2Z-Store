dns.setServers(['8.8.8.8', '1.1.1.1']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dns = require('dns');

require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/apex_store')
.then(() => console.log('MongoDB Atlas Connected Successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Mount Routes

// Mount Auth Routes under /api/auth (Fixes the 404 on login/register)
app.use('/api/auth', authRoutes);

// Mount User management routes under /api (Fixes the 404 on /api/users)
app.use('/api', authRoutes); 

app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));