//The purpose of this file is to navigate the database and record/retrieve data where necessary

const db = require('../config/database.json');
const Model = require('../models/cube');
const fs = require('fs');
const uniqid = require('uniqid');
const path = require('path');

const services = {
  create(params) {
    let cube = new Model(
      uniqid(),
      params.name,
      params.description,
      params.imageUrl,
      params.difficultyLevel
    );
    db.push(cube);

    fs.writeFile(path.join(__dirname, '../config/database.json'), JSON.stringify(db), (err) => {
      if (err) {
        console.log(err);
        return;
      }
    })
  },
  getAllPuzzles(searchParams) {
    //get all items
    let items = db;
    //filter items based on search inputs (name, difficulty from/to)
    if (searchParams.search) {
      items = items.filter((x) => x.name.includes(searchParams.search));
    }
    if (searchParams.from) {
      items = items.filter((x) => x.difficulty >= searchParams.from);

    }
    if (searchParams.to) {
      items = items.filter((x) => x.difficulty <= searchParams.to);

    }
    //return the filtered items so that they can be populated
    return items;
  },
  getDetails(id) {
    return db.find((x) => x.id == id);
  }

}

module.exports = services;
