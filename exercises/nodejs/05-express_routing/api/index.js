'use strict';

// http://offirmo.net/wiki/index.php?title=Express.js
// http://expressjs.com/4x/api.html

const _ = require('lodash');
const express = require('express');


/////////////////////////////////////////////

const router = module.exports = new express.Router();

/////////////////////////////////////////////

router.get('/', (req, res) => {
	res.send('My lord !');
  // TODO a small page listing your endpoints
		
  // cf. js-class-2016-episode-2\src\server\common\meta-routes.js
});



// TODO one or two routes
router.get('/stromtrooper', (req, res) => {
	res.send('stormtrooper');
});
router.get('/hinhin', (req, res) => {
	res.send('hinhin');
});
router.get('yo', (req, res) => {
	res.send('yo');
});
// be creative !



////////////////// examples //////////////

router.get('/hello/:name', function (req, res) {
  res.send(`Hello, ${req.name} !`);
});


router.get('/stuff/:id', function (req, res) {

  res.status(500).json({ error: 'not implemented !' })

  /*
   res.type('json').send({
   id: req.id
   });
   */
});
