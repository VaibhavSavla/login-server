const { env } = process;

const CONSTANTS = {
  PORTAL_PORT: env.PORTAL_PORT || '3003',
  MONGO_URL: env.MONGO_URL || 'mongodb://admin:admin@localhost:27017/loginApp',
  SMS_API_KEY: env.SMS_API_KEY || '<REPLACE_WITH_API_KEY>',
  OTP_NUM_DIGITS: env.OTP_NUM_DIGITS || '4',
  OTP_EXPIRY: env.OTP_EXPIRY || '54000',
};

module.exports = CONSTANTS;
