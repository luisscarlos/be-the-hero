const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

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
routes.post('/ongs', celebrate({
  [Segments.BODY]: Joi.object().keys({ // Validação no segmento Body
    name: Joi.string().required(), //fazendo validação das informações antes de criar no bd
    email: Joi.string().required().email(),
    whatsapp: Joi.string().required().min(10).max(11),
    city: Joi.string().required(),
    uf: Joi.string().required().length(2),
  })
}), OngController.create);

//listar casos específicos de uma ong
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), ProfileController.index);

//lista todos casos(incidents)
routes.get('/incidents', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })
}), IncidentController.index);
//cadastra caso(incident)
routes.post('/incidents', IncidentController.create);
//deleta caso
routes.delete('/incidents/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), IncidentController.delete);

module.exports = routes;