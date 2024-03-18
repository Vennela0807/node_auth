const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  userid: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
});


module.exports = mongoose.model('User', userSchema);