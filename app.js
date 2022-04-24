require('dotenv').config({ 'path': './ENV.env' });

const Server = require('./models/server');

const server = new Server();

//Llamamos al metodo listen para que todo corra 
server.listen();