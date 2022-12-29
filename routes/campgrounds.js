const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/CatchAsync');
const campgrounds = require('../controllers/campgrounds');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const {
  isLoggedIn,
  verifyOwner,
  validateCampground,
} = require('../middleware');

router
  .route('/')
  .get(catchAsync(campgrounds.index))
  .post(
    isLoggedIn,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.createNewCampground)
  );

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router
  .route('/:id')
  .get(catchAsync(campgrounds.showCampground))
  .put(
    isLoggedIn,
    verifyOwner,
    upload.array('image'),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  .delete(isLoggedIn, verifyOwner, catchAsync(campgrounds.deleteCampground));

router.get(
  '/:id/edit',
  isLoggedIn,
  verifyOwner,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
