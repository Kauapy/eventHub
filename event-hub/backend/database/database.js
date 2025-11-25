const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.db',
    logging: true,
})

module.exports = sequelize;