const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');

const logger = require('./utils/logger');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const blogsRouter = require('./controllers/blogs');
const userRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

const app = express();

mongoose.set('strictQuery', false);
const mongoUrl = config.MONGODB_URI;
mongoose.connect(mongoUrl);
logger.info('connecting to MongoDB');

app.use(cors());
app.use(express.json());
app.use(express.static('dist'));
app.use(middleware.requestLogger);
app.use(middleware.tokenExtractor);
if (process.env.NODE_ENV === 'test') {
  // eslint-disable-next-line global-require
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}
app.use('/api/blogs', blogsRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use(middleware.unknownEndPoint);
app.use(middleware.errorHandler);

module.exports = app;
