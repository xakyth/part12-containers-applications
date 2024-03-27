const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const { default: mongoose } = require('mongoose');
const User = require('../models/user');

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', ['url', 'title', 'author']);
  response.json(users);
});

userRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const user = await User.findById(id).populate('blogs', [
      'url',
      'title',
      'author',
    ]);
    response.status(200).json(user);
  } catch (exception) {
    next();
  }
});

userRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body;
  if (password.length < 3) {
    const validationError = new mongoose.Error.ValidationError(null);
    validationError.addError('password', new mongoose.Error.ValidatorError({ message: 'should contain at least 3 characters' }));
    return next(validationError);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const userObject = new User({
    username,
    name,
    passwordHash,
  });
  try {
    await userObject.save();
    response.status(201).json(userObject);
  } catch (exception) {
    next(exception);
  }
});

module.exports = userRouter;
