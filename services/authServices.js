const bcrypt = require('bcrypt');
const User = require('../models/User');
const { SALT_ROUNDS } = require('../config');

async function register({ username, password }) {

  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hash = await bcrypt.hash(password, salt);
  //todo: check if username exists
  const user = new User({ username, password: hash });

  return await user.save();
}

async function login({ username, password }) {
  console.log('here');

  let user = User.findOne({ username });
  console.log(user.password);
  if (!user) {
    
    throw { message: 'User not found' };
  }
  console.log('test2');

  let isMatch = await bcrypt.compare(password, user.password);
  console.log(isMatch);
return {empty: true}
  //generate token

}

module.exports = {
  register,
  login,
}