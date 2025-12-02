import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import Evento from './Evento.js';
import Participante from './Participante.js';
import Organizador from './Organizador.js';

const Ingresso = sequelize.define('Ingressos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codigo_ingresso: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    eventoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Evento,
            key: 'id'
        }
    },
    participanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Participante,
            key: 'id'
        }
    },
    tipo: {
        type: DataTypes.ENUM('inteira', 'meia', 'vip'),
        allowNull: false
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valor_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    valor_total: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('reservado', 'confirmado', 'usado', 'cancelado'),
        allowNull: false,
        defaultValue: 'reservado'
    },
    data_compra: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    data_checkin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    vendedorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Organizador,
            key: 'id'
        }
    }
}, {
    tableName: 'Ingressos',
    timestamps: true
});

export default Ingresso;
