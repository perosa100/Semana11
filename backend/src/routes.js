const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const OngControler = require('./controllers/OngController');
const IncidentController = require('./controllers/IncidentController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

routes.post('/session', SessionController.create);

routes.get('/ongs', OngControler.index);
routes.post(
  '/ongs',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().min(2),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(11),
      city: Joi.string().required().min(2),
      uf: Joi.string().required().length(2),
    }),
  }),
  OngControler.create
);

routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  ProfileController.index
);

routes.post('/incidents', IncidentController.create);

routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object({
      page: Joi.number(),
    }),
  }),
  IncidentController.index
);
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object({
      id: Joi.number().required(),
    }),
  }),
  IncidentController.delete
);

module.exports = routes;
