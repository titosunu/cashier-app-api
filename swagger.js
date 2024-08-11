const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

exports.swagger = (app) => {
  const options = {
    definition: {
      servers: [{ url: 'http://localhost:4000' }],
      openapi: '3.0.0',
      info: {
        title: 'Warmad Cashier App',
        description: 'Cashier application for Madura shop',
        version: '1.0.0',
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'apiKey',
            name: 'authorization',
            scheme: 'bearer',
            in: 'header',
          },
        },
      },
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    // looks for configuration in specified directories
    apis: ['./routes/*.js'],
  };

  app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(options)));

  const swaggerSpec = swaggerJsdoc(options);
  app.use(`/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Documentation in JSON format
  app.get(`/docs.json`, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
