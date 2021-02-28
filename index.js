require('dotenv').config();
const path = require('path');
const express = require('express');
const server = express();
const weatherRouter = require('./routes');

//*             MIDDLEWARE

server.use(express.static(path.join(__dirname, './public')));
server.use(
	express.urlencoded({
		extended: true,
	})
);
server.use(express.json());

server.use('/', weatherRouter);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
	console.log('---Server running');
});
