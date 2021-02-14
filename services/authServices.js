const bcrypt = require('bcrypt');
const User = require('../models/User');
const { SALT_ROUNDS } = require('../config');

async function register({ username, password }) {

  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let hash = await bcrypt.hash(password, salt);
  //todo: check if username exists
  const user = new User({ username, password: hash });

  user.save()
}


module.exports = {
  register,

}