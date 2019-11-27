const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');
const mongoose = require('mongoose');
const compression = require('compression');


const apisV1 = require('./apis_v1/apisV1');

const CONSTANTS = require('./utils/env');
const { logSuccess, logError, logErrorHeading } = require('./utils/logger');
const passportConfig = require('./configs/passport.config');

const app = express();

// Connect to mongoDB
mongoose.connect(CONSTANTS.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Configure middlewares
app.use(morgan('tiny'));
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressSession({ secret: 'login-server', resave: true, saveUninitialized: true }));
passportConfig(app);

app.use('/apis/v1', apisV1);

app.listen(CONSTANTS.PORTAL_PORT, () => {
  logSuccess(`${process.pid} : Server started at ${CONSTANTS.PORTAL_PORT}`);
});

process.on('unhandledRejection', (reason, p) => {
  logErrorHeading('Unhandled Rejection');
  logError(reason, p);
  // process.exit(1);
});

process.on('uncaughtException', (reason, p) => {
  logErrorHeading('Uncaught Exception');
  logError(reason, p);
  // process.exit(1);
});
