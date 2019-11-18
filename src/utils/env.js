const { env } = process;

const CONSTANTS = {
  PORTAL_PORT: env.PORTAL_PORT || '3003',
  MONGO_URL: env.MONGO_URL || 'mongodb://admin:admin@localhost:27017/loginApp',
};

module.exports = CONSTANTS;
