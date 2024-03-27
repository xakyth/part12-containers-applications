const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => blogs.reduce((acc, cur) => acc + cur.likes, 0);

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return undefined;
  return blogs.reduce(
    (maxLikes, cur) => (cur.likes > maxLikes.likes ? cur : maxLikes),
    blogs[0],
  );
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return undefined;
  const countMap = _.countBy(blogs, (b) => b.author);
  const author = _.maxBy(_.keys(countMap), (item) => countMap[item]);
  return { author, blogs: countMap[author] };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return undefined;
  const likesMap = [];
  blogs.forEach((blog) => {
    likesMap[blog.author] = (likesMap[blog.author] || 0) + blog.likes;
  });
  const author = _.maxBy(_.keys(likesMap), (item) => likesMap[item]);
  return { author, likes: likesMap[author] };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
