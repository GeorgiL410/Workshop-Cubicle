const db = require('../config/database.json');
const fs = require('fs');
const path = require('path');

class Model {
  save() {
    db.push(this);

    fs.writeFile(
      path.join(__dirname, '../config/database.json'),
      JSON.stringify(db))
  };

  static getAll() {

    return db;
  };

  static getDetails(id) {
    return db.find((x) => x.id == id);

  };
}

module.exports = Model;