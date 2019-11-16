const express = require('express');
const expressSession = require('express-session');
const morgan = require('morgan');

const apisV1 = require('./apis_v1/apisV1');

const CONSTANTS = require('./utils/env');
const { logSuccess } = require('./utils/logger');
const passportConfig = require('./configs/passport.config');

const app = express();

// Configure middlewares
app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(expressSession({ secret: 'login-server', resave: true, saveUninitialized: true }));
passportConfig(app);

app.use('/apis/v1', apisV1);

app.listen(CONSTANTS.PORTAL_PORT, () => {
  logSuccess(`${process.pid} : Server started at ${CONSTANTS.PORTAL_PORT}`);
});
