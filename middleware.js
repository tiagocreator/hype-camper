const Campground = require('./models/campground');
const Review = require('./models/review');
const ExpressError = require('./utilities/ExpressError');
const { campgroundSchema, reviewsSchema } = require('./schemas.js');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be registered to add a new campground');
    return res.redirect('/login');
  }
  next();
};

module.exports.verifyOwner = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.owner.equals(req.user._id)) {
    req.flash('error', 'You must be the owner of the post to modify it');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};

module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(',');
    throw new ExpressError(errorMessage, 400);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  const { error } = reviewsSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(',');
    throw new ExpressError(errorMessage, 400);
  } else {
    next();
  }
};

module.exports.verifyReviewOwner = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.owner.equals(req.user._id)) {
    req.flash('error', 'You must be the owner of review to do that');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
};
