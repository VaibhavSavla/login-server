/* eslint-disable import/prefer-default-export */
const chalk = require('chalk');

const { log } = console;

function logSuccess(...msgs) {
  log(chalk.green(...msgs));
}

module.exports = {
  logSuccess,
};
