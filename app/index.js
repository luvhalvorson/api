const express = require('express');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/errors');

const { errors } = require('celebrate');
const app = express();
const router = express.Router();

app.use(bodyParser.json());

app.use('/api/auth', require('./routes/auth')(router));

app.use(errors());
app.use(errorHandler);

app.use((req, res) => {
  return res.json({
    error: {
      message: 'Not Found',
      status: 404
    }
  }).status(404);
});

module.exports = app;
