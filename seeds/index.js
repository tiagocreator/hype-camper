const mongoose = require('mongoose');
const Campground = require('../models/campground');
const cities = require('./cities');
const { descriptors } = require('./descriptors');
const { places } = require('./places');

main().catch((err) => console.log('Error: ', err));

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect('mongodb://localhost:27017/hype-camper');
  console.log('Database connected');
}

const randomArr = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  const campgroundsCount = 200;
  await Campground.deleteMany({});
  for (let i = 0; i < campgroundsCount; i++) {
    const randomCities = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 30) + 10;
    const camp = new Campground({
      owner: '63a9c345eb116febd50c0b79',
      location: `${cities[randomCities].city}, ${cities[randomCities].state}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[randomCities].longitude,
          cities[randomCities].latitude,
        ],
      },
      title: `${randomArr(descriptors)} ${randomArr(places)}`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, diam at laoreet suscipit, nibh elit iaculis arcu, sit amet commodo ligula sapien ut arcu. Vivamus ut convallis arcu. Donec vehicula, dolor at iaculis vestibulum, enim dolor efficitur tortor, id convallis felis odio ut erat.',
      price: randomPrice,
      images: [
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672715904/hype-camper/wdnbw61vtweplqcqnjnn.jpg',
          filename: 'hype-camper/wdnbw61vtweplqcqnjnn',
        },
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672715905/hype-camper/rqkafjb35e05bvqdjw3m.jpg',
          filename: 'hype-camper/rqkafjb35e05bvqdjw3m',
        },
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672715906/hype-camper/odlpzq00ddeg8bs0oxob.jpg',
          filename: 'hype-camper/odlpzq00ddeg8bs0oxob',
        },
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672375861/hype-camper/dzzgrcfl1frqzd9hr67d.jpg',
          filename: 'hype-camper/dzzgrcfl1frqzd9hr67d',
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Database saved successfully... Now autoclosing');
});
