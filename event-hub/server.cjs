import express from 'express';
import cors from 'cors';
import sequelize from './backend/config/database.js';

import authRoutes from './backend/routes/authRoutes.js';
import participantesRoutes from './backend/routes/participantesRoutes.js';
import eventosRoutes from './backend/routes/eventosRoutes.js';
import ingressosRoutes from './backend/routes/ingressoRoutes.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/participantes', participantesRoutes);
app.use('/api/eventos', eventosRoutes);
app.use('/api/ingressos', ingressosRoutes);

app.get('/', (req, res) => {
    res.json({ mensagem: 'API funcionando' });
});

sequelize.sync()
    .then(() => {
        console.log('Banco de dados sincronizado');
        app.listen(PORT, () => {
            console.log(`Servidor rodando na porta ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Erro ao sincronizar o banco de dados', err);
    });
