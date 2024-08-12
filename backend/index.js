// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');

const app = express();
const port = 3000;

// Conectar ao MongoDB
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Exemplo de rota (adicionar suas rotas aqui)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'LOJA.html'));
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
