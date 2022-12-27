const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/CatchAsync');
const campgrounds = require('../controllers/campgrounds');

const {
  isLoggedIn,
  verifyOwner,
  validateCampground,
} = require('../middleware');

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(campgrounds.createNewCampground)
);

router.get('/:id', catchAsync(campgrounds.showCampground));

router.get(
  '/:id/edit',
  isLoggedIn,
  verifyOwner,
  catchAsync(campgrounds.renderEditForm)
);

router.put(
  '/:id',
  isLoggedIn,
  verifyOwner,
  validateCampground,
  catchAsync(campgrounds.updateCampground)
);

router.delete(
  '/:id',
  isLoggedIn,
  verifyOwner,
  catchAsync(campgrounds.deleteCampground)
);

module.exports = router;
