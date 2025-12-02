const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/database.db',
    logging: true,
})

module.exports = sequelize;