//the purpose of this file is to assign actions to all pages

// requiring express with .Router loads the view engine
const Router = require('express').Router;
const router = Router();
const productServices = require('../services/productServices');
const accessoryServices = require('../services/accessoryServices');

router.get('/', (req, res) => {

  res.redirect('/products')
});
// add the different paths and handlers
router.get('/products', (req, res) => {

  productServices.getAllPuzzles(req.query)
    .then(products => {
      res.render('home', { title: 'Browse', products });
    })
    .catch(() => res.status(500).end());
});

router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

router.get('/products/create', (req, res) => {
  res.render('create', { title: 'Create' });
});

router.post('/products/create', productServices.validate, (req, res) => {
  productServices.create(req.body);

  res.redirect('/');

});
router.get('/products/details/:productId', async (req, res) => {
  let id = req.params.productId;
  let puzzle = await productServices.getDetails(id);
  res.render('details', { title: 'Product Details', puzzle });

});

router.get('/products/:productId/attach', async (req, res) => {
  let id = req.params.productId;
  let puzzle = await productServices.getDetails(id);
  let accessories = await accessoryServices.getAll();

  res.render('attachAccessory', {puzzle})
});

router.get('*', (req, res) => {
  res.render('404', { title: 'Not Found' });
});

module.exports = router;
