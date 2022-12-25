const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be registered to add a new campground');
    return res.redirect('/login');
  }
  next();
};

module.exports = isLoggedIn;
