const Sequelize = require('sequelize');
const dbconfig = require('./config/connection');

const connection = new Sequelize(dbconfig);

module.exports = connection;