const Accessory = require('../models/Accessory');

function create(data) {
  let accessory = new Accessory(data);
  return accessory.save();
}
function getAvailableAccessories(ids) {
return Accessory.find({_id: {$nin: ids}});
}
function getAll() {
  return Accessory.find().lean();
}

module.exports = {
  create,
  getAll,
  getAvailableAccessories,

}