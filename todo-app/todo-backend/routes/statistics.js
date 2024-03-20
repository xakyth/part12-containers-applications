const redis = require('../redis');
const router = require('express').Router();

router.get('/', async (req, res) => {
  let addedTodos = await redis.getAsync('added_todos');
  if (!addedTodos) {
    await redis.setAsync('added_todos', 0);
    addedTodos = await redis.getAsync('added_todos');
  }
  res.json({ added_todos: addedTodos });
});

module.exports = router;
