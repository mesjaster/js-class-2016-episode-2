#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';

/**
 * FETCHING AN API
 *
 * Fetch the StarWars API  http://swapi.co/
 *
 */


const _ = require('lodash');
const inquirer = require('inquirer'); // https://www.npmjs.com/package/inquirer
const fetch = require('node-fetch'); // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
const ora = require('ora'); // https://github.com/sindresorhus/ora
const prettyjson = require('prettyjson');


// admire how it's readbale :
askUser()
.then(fetchData)
.then(displayResults)
.catch((err) => {
  console.error('! Something bad happened :');
  console.error(err);
});


function askUser() {
  return new Promise(function (resolve, reject) {
    inquirer.prompt([
      {
        name: 'dataType',
        type: 'list',
        message: 'What do you want to know about ?',
        default: 'people',
        choices: ['films', 'people', 'planets', 'species', 'starships', 'vehicles']
      },
      {
        name: 'id',
        message: 'Which id ? (1-n)',
        default: '9'
      }
    ], function (choices) {
      console.log(choices);

      // TODO
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
    });
  });
}

function fetchData(choices) {
  console.log('fetchData input :', choices);

  const url = 'http://swapi.co/api/' + choices.dataType + '/' + choices.id;
  console.log(url);

  const spinner = ora('Fetching StarWars API...');
  spinner.start();

  // TODO now use the fetch API :
  // https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch#Checking_that_the_fetch_was_successful
  return Promise.reject(new Error('fetchData not implemented !'));
}

function displayResults(data) {
  console.log('result :\n', prettyjson.render(data));
}


function getUrl () {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve("http://swapi.co/people/3"), 1500)
  })
}

getUrl()
.then(function fetchData(url) {
  return fetch(url)
    .then(function onResponse(response) {
      if(response.ok)
        return response.json();
      else
        throw new Error('Network response was not ok.');
    });
})
.then(function displayResults(data) {
  console.log(data)
})
.catch(err => console.error(err));
