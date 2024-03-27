const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');
const helper = require('./test_helper');

const api = supertest(app);

describe('initially there are some users in DB', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(helper.users);
  });
  test('dummy test', async () => {
    expect(1).toEqual(1);
  });
  test('can get all the users', async () => {
    const getResponse = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(getResponse.body).toHaveLength(helper.users.length);
  });

  describe('user creation', () => {
    test('can create a new user', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'kinowar',
        name: 'Denis Vasilyev',
        password: '953457gwenj_gXX',
      };
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
      expect(
        usersAtEnd.find((user) => user.username === newUser.username),
      ).toBeDefined();
    });
    test('cannot create user with username less than 3 characters', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'ki',
        name: 'Denis Vasilyev',
        password: '953457gwenj_gXX',
      };
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtStart).toHaveLength(usersAtEnd.length);
    });
    test('password must be at least 3 characters long', async () => {
      const usersAtStart = await helper.usersInDb();
      const newUser = {
        username: 'kinowar',
        name: 'Denis Vasilyev',
        password: '95',
      };
      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await helper.usersInDb();
      expect(usersAtStart).toHaveLength(usersAtEnd.length);
    });
  });
});
