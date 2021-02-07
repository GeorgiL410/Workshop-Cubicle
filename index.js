// this is the file that runs the server.

//pick the environment or get Development by default
const env = process.env.NODE_ENV || 'development';
//initialise express
const app = require('express')();
//get the config from the config.js file (this gives us an object that we can call the port from)
const config = require('./config/config')[env];
//get the routes file that holds the controllers
const routes = require('./routes');
//initialise express using express.js in the config folder
require('./config/express')(app);

//use the routes file
app.use(routes);

//start the server (listen on a specific port)
app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));
