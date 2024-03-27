const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');
const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', ['username', 'name']);
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const blog = await Blog.findById(id).populate('user', ['username', 'name']);
    response.status(200).json(blog);
  } catch (exception) {
    next();
  }
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const blog = request.body;
  blog.likes = blog.likes || 0;
  if (!blog.title) {
    return response.status(400).json({ message: 'title cannot be empty' });
  }
  if (!blog.url) {
    return response.status(400).json({ message: 'url cannot be empty' });
  }

  const { user } = request;
  const userObj = await User.findById(user.id);
  if (!userObj) {
    return response.status(404).json({ messge: 'no such user' });
  }

  let blogObject = new Blog({
    ...request.body,
    user: userObj._id,
  });
  userObj.blogs = userObj.blogs.concat(blogObject._id);
  await userObj.save();

  blogObject = await blogObject.save();
  await blogObject.populate('user', ['username', 'name']);

  return response.status(201).json(blogObject);
});

blogsRouter.post(
  '/:id/comments',
  middleware.userExtractor,
  async (request, response, next) => {
    const { id } = request.params;
    const { comment } = request.body;
    try {
      const blog = await Blog.findById(id);
      blog.comments = blog.comments.concat(comment);
      const result = await blog.save();
      return response.status(200).json(result);
    } catch (exception) {
      return next(exception);
    }
  },
);

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response, next) => {
    const { id } = request.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return response.status(204).end();
    }
    try {
      await blog.deleteOne();
      response.status(204).end();
    } catch (error) {
      return next(error);
    }
  },
);

blogsRouter.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
  };

  try {
    await Blog.findByIdAndUpdate(id, blog, { runValidators: true });
    response.status(200).json(blog);
  } catch (exception) {
    return next(exception);
  }
});

module.exports = blogsRouter;
