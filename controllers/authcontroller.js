const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

exports.signup = async (req, res) => {
  try {
    const { userid, name, password, email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ userid, name, password: hashedPassword, email, role });
    const token = jwt.sign({ userId: user._id, role: user.role }, `${process.env.SECRET_KEY}`, { expiresIn: '10d' });
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { userid, password } = req.body;
  try {
    const user = await User.findOne({ userid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = jwt.sign({ userId: user._id, role: user.role }, `${process.env.SECRET_KEY}`, { expiresIn: '10d' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};