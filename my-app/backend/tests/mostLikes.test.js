const { mostLikes } = require('../utils/list_helper');

const blogs = require('../utils/blogs_for_test');

describe('most likes', () => {
  test('empty blogs', () => {
    expect(mostLikes([])).toBe(undefined);
  });
  test('one blog', () => {
    const expectedValue = {
      author: 'Michael Chan',
      likes: 7,
    };
    expect(mostLikes([blogs[0]])).toEqual(expectedValue);
  });
  test('many blogs', () => {
    const expectedValue = {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    };
    expect(mostLikes(blogs)).toEqual(expectedValue);
  });
});
