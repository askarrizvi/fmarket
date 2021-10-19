// Calling the env library/package
require('dotenv').config();

// storing senseaive information in the development environment
const secret_key = process.env.JWT_SECRET_KEY
const exp =  process.env.JWT_EXPIRATION

// export the values
module.exports = {secret:secret_key, expiration: exp};
