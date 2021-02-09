//The purpose of this file is to navigate the database and record/retrieve data where necessary

const Model = require('../models/cube');
const uniqid = require('uniqid');

const services = {
  create(params) {
    let cube = new Model(
      uniqid(),
      params.name,
      params.description,
      params.imageUrl,
      params.difficultyLevel
    );
    return cube.save();
  },
  getAllPuzzles(searchParams) {
    //get all items
    let items = Model.getAll();
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
    return Model.getDetails(id);
  },
  validate(req, res, next) {
    let isValid = false;

    if (req.body.name.trim().length > 2) {
      isValid = true;
    } else {
      isValid = false
    }
    if (req.body.imageUrl.trim().length > 5) {
      isValid = true;
    } else {
      isValid = false
    }
    if (isValid) {
      next();
    } else {
      res.redirect('/');
    }
  }
}
module.exports = services;
