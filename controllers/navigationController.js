//the purpose of this file is to assign actions to all pages

// requiring express with .Router loads the view engine
const Router = require('express').Router;
const router = Router();
const services = require('../services/services');

// add the different paths and handlers
router.get('/', (req, res) => {

  let items = services.getAllPuzzles(req.query);
  res.render('home', { title: 'Home', items });
})

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
})

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create' });
})

router.post('/create', services.validate, (req, res) => {
  services.create(req.body);

  res.redirect('/');

})
router.get('/details/:productId', (req, res) => {
  let id = req.params.productId;
  let puzzle = services.getDetails(id);
  res.render('details', { title: 'Product Details', puzzle });

})

router.get('*', (req, res) => {
  res.render('404', { title: 'Not Found' });
})

module.exports = router;
