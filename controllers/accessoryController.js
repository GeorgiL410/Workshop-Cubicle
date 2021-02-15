const Router = require('express').Router;
const accessoryService = require('../services/accessoryServices');
const router = Router();
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/create', isAuthenticated, (req, res) => {

  res.render('createAccessory');
});

router.post('/create', isAuthenticated, (req, res) => {
  //TODO: create validation middleware 

  accessoryService.create(req.body)
    .then(() => res.redirect('/products'))
    .catch(() => res.status(500).end());

});
module.exports = router;