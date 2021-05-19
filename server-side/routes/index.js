const postRoutes = require('./posts');
const userRoutes = require('./users');
const chatRoutes = require('./chat');

const constructorMethod = (app) => {
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
  app.use('/chat', chatRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
