const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utilities/CatchAsync');
const users = require('../controllers/users');

router
  .route('/register')
  .get(users.renderRegisterPage)
  .post(catchAsync(users.createNewUser));

router
  .route('/login')
  .get(users.renderLoginPage)
  .post(
    passport.authenticate('local', {
      failureFlash: true,
      failureRedirect: '/login',
    }),
    users.login
  );

router.get('/logout', users.logout);

module.exports = router;
