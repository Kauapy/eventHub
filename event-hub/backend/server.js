const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

const sequelize = require('./config/database')
const authRoutes = require('./routes/authRoutes')
const participantesRoutes = require('./routes/participantesRoutes')
const eventosRoutes = require('./routes/eventosRoutes')
const ingressosRoutes = require('./routes/ingressoRoutes')

app.use('/api/auth', authRoutes)
app.use('/api/participantes', participantesRoutes)
app.use('/api/eventos', eventosRoutes)
app.use('/api/ingressos', ingressosRoutes)

app.get('/', (req, res)=>{
    res.json({ mensagem: 'API funcionando' })
})

sequelize.sync()
.then(()=>{
    console.log('Banco de dados sincronizado')
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT}`)
    })
})
.catch(err=>{
    console.error('Erro ao sincronizar o banco de dados', err)
})