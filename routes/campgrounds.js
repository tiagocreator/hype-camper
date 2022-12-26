const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');
const catchAsync = require('../utilities/CatchAsync');
const ExpressError = require('../utilities/ExpressError');
const { campgroundSchema } = require('../schemas.js');
const isLoggedIn = require('../middleware');

const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(',');
    throw new ExpressError(errorMessage, 400);
  } else {
    next();
  }
};

router.get(
  '/',
  catchAsync(async (req, res) => {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', { campgrounds });
  })
);

router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

router.post(
  '/',
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res, next) => {
    const campground = new Campground(req.body.campground);
    campground.owner = req.user._id;
    await campground.save();
    req.flash('success', 'Campground created successfully');
    res.redirect(`campgrounds/${campground._id}`);
  })
);

router.get(
  '/:id',
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findById(id)
      .populate('reviews')
      .populate('owner');
    if (!campground) {
      req.flash('error', 'Sorry, cannot find that campground');
      return res.redirect('/campgrounds');
    }
    res.render('campgrounds/show', { campground });
  })
);

router.get(
  '/:id/edit',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const campground = await Campground.findById(req.params.id);
    if (!campground) {
      req.flash('error', 'Sorry, cannot find that campground');
      return res.redirect('/campgrounds');
    }
    res.render('campgrounds/edit', { campground });
  })
);

router.put(
  '/:id',
  isLoggedIn,
  validateCampground,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    const campground = await Campground.findByIdAndUpdate(id, {
      ...req.body.campground,
    });
    req.flash('success', 'Campground updated successfully');
    res.redirect(`/campgrounds/${campground._id}`);
  })
);

router.delete(
  '/:id',
  isLoggedIn,
  catchAsync(async (req, res) => {
    const { id } = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash('success', 'Campground removed successfully');
    res.redirect('/campgrounds');
  })
);

module.exports = router;
