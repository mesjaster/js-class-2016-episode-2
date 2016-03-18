#!/bin/sh
':' //# http://sambal.org/?p=1014 ; exec /usr/bin/env node --harmony_modules --harmony_regexps --harmony_proxies --harmony_sloppy_function --harmony_sloppy_let --harmony_unicode_regexps --harmony_reflect --harmony_destructuring --harmony_default_parameters --harmony_sharedarraybuffer --harmony_atomics --harmony_simd "$0" "$@"
'use strict';


/*****
 * THE NUMBER GAME
 *
 * The player must find a number between 1 and 100.
 * After each try, we tell him if too small, too big or victory !
 *
 */

const _ = require('lodash');
const chalk = require('chalk');
const prompt = require('prompt'); // https://www.npmjs.com/package/prompt

const valueToGuess = _.random(1, 100);

prompt.start();

prompt.get([{
  name: 'name',
  description: chalk.blue.bold('What is your name ?'),   // Prompt displayed to the user
  type: 'string',                       // Specify the type of input to expect.
  default: 'Sam'                        // Default value to use if no value is entered.
}], (err, result) => {
  if (err) return console.error(err);

  console.log(`Welcome, ${result.name} !`);

  tryAgain(retry);
});


function retry(err, bool) {
    if (bool == false) return tryAgain(retry);
}


function tryAgain(callback) {
  prompt.get( [{
    name: 'value',
    description: chalk.blue.bold('Find the number between 1 and 100'), // Prompt displayed to the user
    pattern: /^\d{1,3}$/,
    message: chalk.red('Must be a number between 1 and 100'), // Warning message to display if validation fails.
    required: true                        // If true, value entered must be non-empty.
  }], (err, result) => {
    if (err) return callback(err);

    if (result.value < valueToGuess) {
      console.log(chalk.red('Too small !'));
      return callback(null, false);
    }
    else if (result.value > valueToGuess) {
      console.log(chalk.red('Too big !'));
      return callback(null, false);
    }
    else {
      console.log(chalk.black.bgYellow('You won !'));
      return callback(null, true);
    }
  });
}
