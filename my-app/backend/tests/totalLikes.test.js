const listHelper = require('../utils/list_helper');

describe('total likes', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      __v: 0,
      title: 'title 1',
      author: 'author 1',
      url: 'url 1',
      likes: 0,
    },
    {
      _id: '5a422aa71b54a676234d43a2',
      __v: 0,
      title: 'title 2',
      author: 'author 2',
      url: 'url 2',
      likes: 5,
    },
    {
      _id: '5a422aa71b54a676234d1398',
      __v: 0,
      title: 'title 3',
      author: 'author 3',
      url: 'url 3',
      likes: 3,
    },
    {
      _id: '5a422aa71b54a676234d8214',
      __v: 0,
      title: 'title 4',
      author: 'author 4',
      url: 'url 4',
      likes: 4,
    },
  ];
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });
  test('when list has only one blog equals the likes of that', () => {
    expect(listHelper.totalLikes([blogs[1]])).toBe(5);
  });
  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(blogs)).toBe(12);
  });
});
