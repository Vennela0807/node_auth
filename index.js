const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const authRoutes = require('./routes/authroute');
const productRoutes = require('./routes/productroute');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});