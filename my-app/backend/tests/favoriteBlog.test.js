const { favoriteBlog } = require('../utils/list_helper');
const blogs = require('../utils/blogs_for_test');

describe('favorite blog', () => {
  test('array of blogs is empty', () => {
    expect(favoriteBlog([])).toBe(undefined);
  });
  test('array with 1 blog', () => {
    expect(favoriteBlog([blogs[0]])).toEqual(blogs[0]);
  });
  test('array of multiple blogs', () => {
    const expectedResult = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0,
    };
    expect(favoriteBlog(blogs)).toEqual(expectedResult);
  });
});
