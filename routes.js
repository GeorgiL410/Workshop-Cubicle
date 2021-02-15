//the purpose of this file is to be the master router - the master router assigns routes to different controllers.
//first of all, require express
const { Router } = require('express');


// get the controllers
const navigationController = require('./controllers/navigationController');
const accessoryController = require('./controllers/accessoryController');
const authController = require('./controllers/authController');

// initialise the router 
const router = Router();
//use the controllers (different paths for different controllers)
router.use('/accessories', accessoryController);
router.use('/auth', authController);
router.use('/products', navigationController);
router.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});
router.get('*', (req, res) => {
  res.render('404', { title: 'Not Found' });
});


module.exports = router;
