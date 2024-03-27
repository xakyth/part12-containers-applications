const User = require('../models/user');

const users = [
  {
    username: 'mluukkai',
    name: 'Matti Luukkainen',
    passwordHash:
      '$2b$10$j4QfpTBwApgm7HEGnGEFQeolCZ/Jca.ys4r6WaXIrcyEMk91LErxG',
  },
  {
    username: 'hellas',
    name: 'Arto Hellas',
    passwordHash:
      '$2b$10$q1cX83iHMNWbDXYDuL1omeWTdReOdmfDJ0W78jRMAow6McGh2yF7K',
  },
];

const usersInDb = async () => {
  const userFindQuery = await User.find({});
  return userFindQuery.map((user) => user.toJSON());
};

module.exports = {
  users,
  usersInDb,
};
