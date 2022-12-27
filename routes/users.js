const express = require('express');
const passport = require('passport');
const router = express.Router();
const catchAsync = require('../utilities/CatchAsync');
const users = require('../controllers/users');

router.get('/register', users.renderRegisterPage);

router.post('/register', catchAsync(users.createNewUser));

router.get('/login', users.renderLoginPage);

router.post(
  '/login',
  passport.authenticate('local', {
    failureFlash: true,
    failureRedirect: '/login',
  }),
  users.login
);

router.get('/logout', users.logout);

module.exports = router;
