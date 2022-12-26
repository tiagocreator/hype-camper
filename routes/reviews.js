const express = require('express');
const router = express.Router({ mergeParams: true });
const Review = require('../models/review');
const catchAsync = require('../utilities/CatchAsync');
const Campground = require('../models/campground');
const { validateReview, isLoggedIn } = require('../middleware');

router.post(
  '/',
  isLoggedIn,
  validateReview,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id);
    const review = new Review(req.body.review);
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success', 'You created a new review');
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  '/:reviewId',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Review deleted successfully');
    res.redirect(`/campgrounds/${id}`);
  })
);

module.exports = router;
