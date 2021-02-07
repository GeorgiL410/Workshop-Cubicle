//the purpose of this file is to be the master router - the master router assigns routes to different controllers.
//first of all, require express
const { Router } = require('express');
// get the controllers
const navigationController = require('./controllers/navigationController');

// initialise the router 
const router = Router();
//use the controllers (different paths for different controllers)
router.use('/', navigationController);

module.exports = router;
