const postData = require('./posts');
const userData = require('./users');
const imageData=require('./image');

module.exports = {
  users: userData,
  posts: postData,
  images:imageData
};
