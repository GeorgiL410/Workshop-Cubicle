//the purpose of this file is to create a template of how we store the data in the database
const mongoose = require('mongoose');
const cubeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  description: {
    type: String,
    required: true,
    maxlength: 100,

  },
  imageUrl: {
    type: String,
    required: true,
    validate: /^https?|/,

  },
  difficultyLevel: {
    type: Number,
    required: true,
    min: 1,
    max: 6,
  },
  accessories: {
    type: mongoose.Types.ObjectId,
    ref: 'Accesory'
  }


})

module.exports = mongoose.model('Cube', cubeSchema);
