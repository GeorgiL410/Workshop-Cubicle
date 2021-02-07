// the purpose of this file is to setup the view engine (handlebars), the public folder (static) and the body-parser (urlencoded)

const express = require('express');
const handlebars = require('express-handlebars');

module.exports = (app) => {
    app.engine('hbs', handlebars({
        extname: 'hbs',
      }));
      app.set('view engine', 'hbs');
      app.use(express.static('public'));
    
      app.use(express.urlencoded({
        extended: true
    }));

};