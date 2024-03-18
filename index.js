const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authroute');
const productRoutes = require('./routes/productroute');

const app = express();
const PORT = 3000;
const MONGODB_URI = 'mongodb://localhost:27017/connect';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});