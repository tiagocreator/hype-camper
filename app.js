if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const ConnectMongo = require('connect-mongo');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utilities/ExpressError');
const passport = require('passport');
const passportLocal = require('passport-local');
const User = require('./models/user');
const expressMongoSanitize = require('express-mongo-sanitize');

const userRoutes = require('./routes/users');
const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews');

const atlasUrl = process.env.ATLAS_URL;
const localUrl = 'mongodb://localhost:27017/hype-camper';
const dbUrl = atlasUrl || localUrl;

main().catch((err) => console.log('Error: ', err));

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(dbUrl);
  console.log('Database connected');
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressMongoSanitize());

const envSecret = process.env.SESSION_SECRET;
const localSecret = 'test-secret';
const sessionSecret = envSecret || localSecret;

const store = new ConnectMongo({
  mongoUrl: dbUrl,
  secret: sessionSecret,
  touchAfter: 24 * 60 * 60,
});

store.on('error', (e) => {
  console.log('Database error: ', e);
});

const sessionConfig = {
  store: store,
  name: 'cookie',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

app.use('/', userRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);

app.get('/', (req, res) => {
  res.render('home');
});

app.all('*', (req, res, next) => {
  next(new ExpressError('Error 404: Page not found', 404));
});

app.use((err, req, res, next) => {
  const { status = 500 } = err;
  if (!err.message) err.message = 'Sorry, something went wrong';
  res.status(status).render('error', { err });
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
