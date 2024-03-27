const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Blog = require('../models/blog');
const testHelper = require('./blogs_api_helper');

const api = supertest(app);
let TEST_USER1_TOKEN = '';
let TEST_USER2_TOKEN = '';

beforeAll(async () => {
  await api.post('/api/users', {}).send({
    username: 'test1',
    name: 'test1',
    password: 'test1',
  });
  const res1 = await api.post('/api/login').send({
    username: 'test1',
    password: 'test1',
  });
  TEST_USER1_TOKEN = res1._body.token;
  await api.post('/api/users').send({
    username: 'test2',
    name: 'test2',
    password: 'test2',
  });
  const res2 = await api.post('/api/login').send({
    username: 'test2',
    password: 'test2',
  });
  TEST_USER2_TOKEN = res2._body.token;
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(testHelper.initialBlogs);
});

describe('initially some blogs saved', () => {
  test('get all blogs in json format', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(testHelper.initialBlogs.length);
  });

  test('unique identifier is "id"', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((b) => {
      expect(b.id).toBeDefined();
    });
  });

  test('single block can be fetched via get', async () => {
    let response = await api.get('/api/blogs');
    const initialBlogs = response.body;
    response = await api
      .get(`/api/blogs/${initialBlogs[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/);
    const blog = response.body;
    expect(blog).toEqual(initialBlogs[0]);
  });

  describe('addition of a blog', () => {
    test('successfull creation of a new blog', async () => {
      const newBlog = {
        title: 'Testing the backend',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
        likes: 0,
      };

      await api
        .post('/api/blogs')
        .set({ Authorization: `Bearer ${TEST_USER1_TOKEN}` })
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const getResponse = await api.get('/api/blogs');
      expect(getResponse.body).toHaveLength(testHelper.initialBlogs.length + 1);
      const urls = getResponse.body.map((b) => b.url);
      expect(urls).toContain(newBlog.url);
    });

    test('create blog without likes specified', async () => {
      const newBlog = {
        title: 'Testing the backend',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      };

      const postResponse = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TEST_USER2_TOKEN}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
      expect(postResponse.body.likes).toEqual(0);
    });

    test('creation of blog without title or url will return 400 Bad Request', async () => {
      const blogWithoutTitle = {
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
      };
      let postRequest = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`)
        .send(blogWithoutTitle)
        .expect(400);
      expect(postRequest.body.message).toEqual('title cannot be empty');
      const blogWithoutUrl = {
        title: 'Testing the backend',
        author: 'Matti Luukkainen',
      };

      postRequest = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`)
        .send(blogWithoutUrl)
        .expect(400);
      expect(postRequest.body.message).toEqual('url cannot be empty');

      const blogWithoutTitleAndUrl = {
        author: 'Matti Luukkainen',
      };
      postRequest = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`)
        .send(blogWithoutTitleAndUrl)
        .expect(400);
    });
    test('blog creation will fail with 401 if token is not provided', async () => {
      const newBlog = {
        title: 'Testing the backend',
        author: 'Matti Luukkainen',
        url: 'https://fullstackopen.com/en/part4/testing_the_backend',
        likes: 0,
      };
      await api.post('/api/blogs').send(newBlog).expect(401);
    });
  });
  describe('deletion of a blog', () => {
    test('blog can be deleted when accessed by id', async () => {
      let getResponse = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`);
      const blogsAtStart = getResponse.body;

      const blogToDelete = blogsAtStart[0];
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`)
        .expect(204);

      getResponse = await api.get('/api/blogs');
      const blogsAtEnd = getResponse.body;
      expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1);

      const urls = blogsAtEnd.map((b) => b.url);
      expect(urls).not.toContain(blogToDelete.url);
    });

    test('non valid id', async () => {
      let getResponse = await api.get('/api/blogs');
      const blogsAtStart = getResponse.body;

      await api
        .delete('/api/blogs/65eac765f00856179eeba777')
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`)
        .expect(204);

      getResponse = await api.get('/api/blogs');
      const blogsAtEnd = getResponse.body;

      expect(blogsAtStart).toHaveLength(blogsAtEnd.length);
    });
  });

  describe('update information of an individual blog post', () => {
    test('properties can be updated', async () => {
      const notesAtStart = await api
        .get('/api/blogs')
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`);
      const blogToBeUpdated = notesAtStart.body[0];
      const updatedBlog = {
        ...blogToBeUpdated,
        likes: blogToBeUpdated.likes + 1,
        author: "I'm a new author",
        url: 'site moved',
        title: 'Title has been screwed',
      };

      await api
        .put(`/api/blogs/${blogToBeUpdated.id}`)
        .set('Authorization', `Bearer ${TEST_USER1_TOKEN}`)
        .send(updatedBlog)
        .expect(200);

      const getResponse = await api.get(`/api/blogs/${blogToBeUpdated.id}`);
      const savedUpdatedBlog = getResponse.body;
      expect(updatedBlog).toEqual(savedUpdatedBlog);
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
