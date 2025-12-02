import Organizador from './Organizador.js';
import Participante from './Participante.js';
import Evento from './Evento.js';
import Ingresso from './Ingresso.js';

Organizador.hasMany(Participante,{foreignKey: "createdBy", as: "participantesCriados"})
Organizador.hasMany(Participante,{foreignKey: "updatedBy", as: "participantesAtualizados"})

Participante.belongsTo(Organizador,{foreignKey: "createdBy", as: "criador", onDelete: "RESTRICT", onUpdate: "CASCADE"})
Participante.belongsTo(Organizador,{foreignKey: "updatedBy", as: "atualizador", onDelete: "SET NULL", onUpdate: "CASCADE"})


Organizador.hasMany(Evento,{foreignKey: "organizadorId", as: "eventos"})
Evento.belongsTo(Organizador,{foreignKey: "organizadorId", as: "organizador"})


Evento.hasMany(Ingresso,{foreignKey: "eventoId", as: "ingressos"})
Ingresso.belongsTo(Evento,{foreignKey: "eventoId", as: "evento"})


Participante.hasMany(Ingresso,{foreignKey: "participanteId", as: "compras"})
Ingresso.belongsTo(Participante,{foreignKey: "participanteId", as: "participante"})


Organizador.hasMany(Ingresso,{foreignKey: "vendedorId", as: "vendas"})

Ingresso.belongsTo(Organizador,{foreignKey: "vendedorId", as: "vendedor"})

module.exports ={
    Organizador,
    Participante,
    Evento,
    Ingresso
}