/* eslint-disable import/prefer-default-export */
const chalk = require('chalk');

const { log } = console;

function logSuccess(...msgs) {
  log(chalk.green(...msgs));
}

function logErrorHeading(heading) {
  log(chalk.bgRed(heading));
}

function logError(...msgs) {
  log(chalk.red(...msgs));
}

module.exports = {
  logSuccess,
  logError,
  logErrorHeading,
};
