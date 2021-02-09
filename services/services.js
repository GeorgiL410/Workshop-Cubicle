//The purpose of this file is to navigate the database and record/retrieve data where necessary

const Cube = require('../models/cube');
const Generic = require('../models/Model');


const services = {
  create(data) {
    let item = new Cube(data);
    return item.save();
  },
  async getAllPuzzles(searchParams) {

    let items = await Cube.find({});
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
    return Cube.findById(id);
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
