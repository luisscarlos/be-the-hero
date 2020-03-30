const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors()); // usado para não retornar erro 500 na aplicação quando
                   // o usuário preencher algum campo que não atenda os requisitos de validação

module.exports = app;