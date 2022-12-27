const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/CatchAsync');
const reviews = require('../controllers/reviews');

const {
  validateReview,
  isLoggedIn,
  verifyReviewOwner,
} = require('../middleware');

router.post(
  '/',
  isLoggedIn,
  validateReview,
  catchAsync(reviews.createNewReview)
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  verifyReviewOwner,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
