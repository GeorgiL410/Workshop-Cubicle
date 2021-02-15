const router = require('express').Router();
const authServices = require('../services/authServices');
const { COOKIE_NAME } = require('../config');
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');

});
router.post('/register', async (req, res) => {

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

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {

    let token = await authServices.login({ username, password });
    res.cookie(COOKIE_NAME, token);
    res.redirect('/products');
  } catch (error) {
    res.render('login', { error });
  }
})
module.exports = router;
