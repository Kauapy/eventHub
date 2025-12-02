import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
const Organizador = sequelize.define('Organizadores', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    senha_hash: {
        type: DataTypes.STRING,
        allowNull: false
    },

    perfil: {
        type: DataTypes.ENUM('admin', 'organizador', 'vendedor'),
        allowNull: false,
        defaultValue: 'organizador'
    },

    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

}, {
    tableName: "Organizadores",
    timestamps: true            
});

module.exports = Organizador;
