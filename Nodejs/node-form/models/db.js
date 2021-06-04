'use strict';

const Sequelize = require('sequelize');

//BD connection
const sequelize = new Sequelize('sql_database', 'root', 'mysql', {
    host: "localhost",
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}