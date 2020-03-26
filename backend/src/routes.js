const express = require('express');

const OngController = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//rota para login
routes.post('/sessions', SessionController.create);

//rota para listar todas ongs
 routes.get('/ongs', OngController.index);
//cadastra ong
routes.post('/ongs', OngController.create);

//listar casos específicos de uma ong
routes.get('/profile', ProfileController.index);

//lista todos casos(incidents)
routes.get('/incidents', IncidentController.index);
//cadastra caso(incident)
routes.post('/incidents', IncidentController.create);
//deleta caso
routes.delete('/incidents/:id', IncidentController.delete);

module.exports = routes;