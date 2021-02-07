//the purpose of this file is to create a template of how we store the data in the database
const db = require('../config/database.json');
const fs = require('fs');
const path = require('path');

class Cube {
  constructor(id, name, description, imageUrl, difficulty) {
    this.id = id,
      this.name = name,
      this.description = description,
      this.imageUrl = imageUrl,
      this.difficulty = difficulty
  }

  save() {
    db.push(this);

    fs.writeFile(path.join(__dirname, '../config/database.json'), JSON.stringify(db), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  }

}

module.exports = Cube;
