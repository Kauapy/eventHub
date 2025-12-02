import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Organizador from './Organizadores.js';

const Evento = sequelize.define('Eventos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    local: {
        type: DataTypes.STRING,
        allowNull: false
    },

    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data_evento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },

    hora_evento: {
        type: DataTypes.STRING, 
        allowNull: false
    },

    capacidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },

    valor_inteira: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    valor_vip: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM('aberto', 'esgotado', 'encerrado', 'cancelado'),
        allowNull: false,
        defaultValue: 'aberto'
    },

    imagem_url: {
        type: DataTypes.STRING,
        allowNull: true
    },

    organizadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organizador,
            key: 'id'
        }
    },

    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organizador,
            key: 'id'
        }
    },

    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Organizador,
            key: 'id'
        }
    }

}, {
    tableName: 'Eventos',
    timestamps: true 
});

module.exports = Evento;
