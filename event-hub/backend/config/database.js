import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './config/database.db',
    logging: true,
});

export default sequelize;
