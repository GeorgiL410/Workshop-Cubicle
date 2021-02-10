const Router = require('express').Router;
const accessoryService = require('../services/accessoryServices');
const router = Router();

router.get('/create', (req, res) => {

  res.render('createAccessory');
});

router.post('/create', (req, res) => {
//TODO: create validation middleware 

accessoryService.create(req.body)
  .then(()=> res.redirect('/products'))
  .catch(() => res.status(500).end());

});
module.exports = router;