const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {SALT_ROUNDS, SECRET} = require('../config');

async function register({ username, password }) {

  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hash = await bcrypt.hash(password, salt);
  //todo: check if username exists
  const user = new User({ username, password: hash });

  return await user.save();
}
const login = async ({ username, password }) => {

  let user = await User.findOne({ username });
  if (!user) {

    throw { message: 'User not found' };
  }

  let isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw { message: 'Incorrect password!' };
  }
  let token = jwt.sign({ _id: user._id , roles: ['admin']}, SECRET);

  return token;
}


module.exports = {
  register,
  login,
}