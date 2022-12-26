const Campground = require('./models/campground');

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
