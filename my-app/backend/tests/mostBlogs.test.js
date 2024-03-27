const { mostBlogs } = require('../utils/list_helper');

const blogs = require('../utils/blogs_for_test');

describe('most blogs', () => {
  test('empty blogs', () => {
    expect(mostBlogs([])).toBe(undefined);
  });
  test('one blog', () => {
    const expectedValue = {
      author: 'Michael Chan',
      blogs: 1,
    };
    expect(mostBlogs([blogs[0]])).toEqual(expectedValue);
  });
  test('many blogs', () => {
    const expectedValue = {
      author: 'Robert C. Martin',
      blogs: 3,
    };
    expect(mostBlogs(blogs)).toEqual(expectedValue);
  });
});
