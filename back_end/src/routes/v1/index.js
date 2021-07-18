const express = require('express');
const adminRoute = require('./admin.route');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const courseRoute = require('./course.route');
const categoryRoute = require('./category.route');
const videoRoute = require('./video.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/admin',
    route: adminRoute
  },
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
    path: '/videos',
    route: videoRoute,
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
