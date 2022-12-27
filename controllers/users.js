const User = require('../models/user');

module.exports.renderRegisterPage = (req, res) => {
  res.render('users/register');
};

module.exports.createNewUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (e) => {
      if (e) {
        return;
      }
      req.flash('success', 'Welcome to Hype Camper, thanks for registering!');
      res.redirect('/campgrounds');
    });
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register');
  }
};

module.exports.renderLoginPage = (req, res) => {
  res.render('users/login');
};

module.exports.login = (req, res) => {
  req.flash('success', 'Welcome back to Hype Camper');
  res.redirect('/campgrounds');
};

module.exports.logout = (req, res) => {
  req.logout((e) => {
    if (e) {
      return;
    }
    req.flash('success', 'You have logged out successfully');
    res.redirect('/campgrounds');
  });
};
