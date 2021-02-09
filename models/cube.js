//the purpose of this file is to create a template of how we store the data in the database
const Model = require('./Model');

class Cube extends Model {
  constructor(id, name, description, imageUrl, difficulty) {
    this.id = id,
      this.name = name,
      this.description = description,
      this.imageUrl = imageUrl,
      this.difficulty = difficulty
  }
}

module.exports = Cube;
