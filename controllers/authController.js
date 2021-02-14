const router = require('express').Router();
const authServices = require('../services/authServices');
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/register', (req, res) => {
  res.render('register');

});
router.post('/register', async (req, res) => {
  ;
  const { username, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
  
    return res.render('register', { message: "Password missmatch!" });
  }

  try {
    await authServices.register({ username, password });
    res.redirect('/products');
  } catch (error) {
    res.render('register', { error });
  }
});

module.exports = router;
