const express = require('express');
const chatbotRoute = require('./chatbot.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const courseRoute = require('./course.route');
const categoryRoute = require('./category.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  // {
  //   path: '/chatbot',
  //   route: chatbotRoute
  // },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/courses',
    route: courseRoute,
  },
  {
    path: '/categories',
    route: categoryRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
