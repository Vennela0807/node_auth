const jwt = require('jsonwebtoken');
const User = require('../model/user');
require('dotenv').config();

exports.authenticate = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) 
    token = req.headers.authorization.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'You are not logged in' });
  }
 
  try {
    const decoded = await jwt.verify(token, `${process.env.SECRET_KEY}`);
    const user =  await User.findById(decoded.userId);
    if (!user){
      return res.status(401).json({ message: 'User does not exist' });
    }
    console.log(decoded);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

