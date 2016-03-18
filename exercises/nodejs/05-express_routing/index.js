#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

// a better express app

console.log('Hello world !');

const _ = require('lodash');
const express = require('express');

const local_ips = require('../../../src/server/common/local-ips').getLocalIps();

const listening_port = 3000;


/////////////////////////////////////////////

const api_router = require('./api');
const meta_router = require('../../../src/server/common/meta-routes');

/////////////////////////////////////////////

const app = express();

app.use((req, res, next) => {
  console.log(`Request to $(req.url) received at`, Date.now());
  res.header('x-received-at', Date.now()); // set a custom header
  next();
});

app.get('/', function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.send('hello from app ! Try /meta /api');
});

app.use('/api', api_router);
app.use('/meta', meta_router);

/////////////////////////////////////////////

app.listen(listening_port, () => {
  local_ips.forEach(ip => console.log('Listening on http://' + ip + ':' + listening_port));
});
console.log('(Ctrl+C to stop)');
