const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors } = require('./descriptors');
const { places } = require('./places');

main().catch((err) => console.log('Error: ', err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/hype-camper');
  console.log('Database connected');
}

const randomArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const randomCities = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      location: `${cities[randomCities].city}, ${cities[randomCities].state}`,
      title: `${randomArr(descriptors)} ${randomArr(places)}`,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Database saved successfully... Now autoclosing');
});
