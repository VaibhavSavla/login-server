const { env } = process;

const CONSTANTS = {
  PORTAL_PORT: env.PORTAL_PORT || 3003,
};

module.exports = CONSTANTS
