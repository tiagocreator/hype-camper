const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Campground = require('./models/campground');

main().catch((err) => console.log('Error: ', err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/hype-camper');
  console.log('Database connected');
}

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('test');
});

app.get('/makecampground', async (req, res) => {
  const testcampground = new Campground({
    title: 'New Campground',
    price: '25.00',
    description: 'My test campground',
    location: 'Test location',
  });
  await testcampground.save();
  res.send(testcampground);
});

app.listen(3000, () => {
  console.log('Serving on port 3000');
});
