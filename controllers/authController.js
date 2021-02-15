const router = require('express').Router();
const authServices = require('../services/authServices');
const isGuest = require('../middlewares/isGuest');
const isAuthenticated = require('../middlewares/isAuthenticated');


const { COOKIE_NAME } = require('../config');
router.get('/login', isGuest, (req, res) => {
  res.render('login');
});

router.get('/register', isGuest, (req, res) => {
  res.render('register');

});
router.post('/register', isGuest, async (req, res) => {

  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {

    return res.render('register', { message: "Password missmatch!" });
  }

  try {
    let user = await authServices.register({ username, password });
    res.redirect('/auth/login');
  } catch (error) {
    res.render('register', { error });
  }
});

router.post('/login', isGuest, async (req, res) => {
  const { username, password } = req.body;
  try {

    let token = await authServices.login({ username, password });
    res.cookie(COOKIE_NAME, token);
    res.redirect('/products');
  } catch (error) {
    res.render('login', { error });
  }
})

router.get('/logout',isAuthenticated, (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.redirect('/products');
})

module.exports = router;
