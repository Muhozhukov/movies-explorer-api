require('dotenv').config();

const {
  PORT = 3000,
  DB_LINK = 'mongodb://localhost:27017/movie-explorer',
} = process.env;

module.exports = {
  PORT,
  DB_LINK,
};
