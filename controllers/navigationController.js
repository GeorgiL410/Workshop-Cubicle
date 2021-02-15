//the purpose of this file is to assign actions to all pages

// requiring express with .Router loads the view engine
const Router = require('express').Router;
const router = Router();
const productServices = require('../services/productServices');
const accessoryServices = require('../services/accessoryServices');

const isAuthenticated = require('../middlewares/isAuthenticated');
const isGuest = require('../middlewares/isGuest');

// add the different paths and handlers
router.get('/', (req, res) => {

  productServices.getAllPuzzles(req.query)
    .then(products => {
      res.render('home', { title: 'Browse', products });
    })
    .catch(() => res.status(500).end());
});



router.get('/create', isAuthenticated, (req, res) => {
  res.render('create', { title: 'Create' });
});

router.post('/create', productServices.validate, isAuthenticated, (req, res) => {
  productServices.create(req.body, req.user);

  res.redirect('/products');

});
router.get('/details/:productId', async (req, res) => {
  let id = req.params.productId;
  let puzzle = await productServices.getFullDetails(id);
  res.render('details', { title: 'Product Details', puzzle });

});

router.get('/:productId/attach', isAuthenticated, async (req, res) => {
  let id = req.params.productId;
  let puzzle = await productServices.getDetails(id);
  let accessories = await accessoryServices.getAvailableAccessories(puzzle.accessories).lean();

  res.render('attachAccessory', { puzzle, accessories })
});
router.post('/:productId/attach', isAuthenticated, (req, res) => {
  productServices.attachAccessory(req.params.productId, req.body.accessory)
    .then(() => res.redirect(`/products/details/${req.params.productId}`))
});

router.get('/:productId/edit', isAuthenticated, (req, res) => {
  productServices.getDetails(req.params.productId)
    .then(product => {
      res.render('editCube', product)

    })
});

router.post('/:productId/edit', isAuthenticated, productServices.validate, (req, res) => {
  productServices.updateOne(req.params.productId, req.body)
    .then(response => {
      res.redirect(`/products/details/${req.params.productId}`)
    })
    .catch(error => {
      console.log(error);
    })

});

router.get('/:productId/delete', isAuthenticated, (req, res) => {
  productServices.getDetails(req.params.productId)
    .then(product => {
      if (req.user._id != product.creator) {
        res.redirect('/products');
      } else {

        res.render('deleteCube', product);
      }

    })
});
router.post('/:productId/delete', isAuthenticated, (req, res) => {
  productServices.getDetails(req.params.productId)
    .then(product => {
      if (product._id !== req.user._id) {
        res.redirect('/products')
      }
      return productServices.deleteOne(req.params.productId)
    })
    .then(response => res.redirect('/products'))
});

module.exports = router;
