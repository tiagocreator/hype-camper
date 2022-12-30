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
  await Campground.deleteMany({});
  for (let i = 0; i < 20; i++) {
    const randomCities = Math.floor(Math.random() * 1000);
    const randomPrice = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      owner: '63a9c345eb116febd50c0b79',
      location: `${cities[randomCities].city}, ${cities[randomCities].state}`,
      title: `${randomArr(descriptors)} ${randomArr(places)}`,
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc euismod, diam at laoreet suscipit, nibh elit iaculis arcu, sit amet commodo ligula sapien ut arcu. Vivamus ut convallis arcu. Donec vehicula, dolor at iaculis vestibulum, enim dolor efficitur tortor, id convallis felis odio ut erat.',
      price: randomPrice,
      images: [
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672281260/hype-camper/gsvua0spvtuhtb18dfyv.jpg',
          filename: 'hype-camper/gsvua0spvtuhtb18dfyv',
        },
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672281260/hype-camper/ci0pqhclubxc4zgdqdfl.jpg',
          filename: 'hype-camper/ci0pqhclubxc4zgdqdfl',
        },
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672281261/hype-camper/tvjdlvhrbvcujfjsabhn.jpg',
          filename: 'hype-camper/tvjdlvhrbvcujfjsabhn',
        },
        {
          url: 'https://res.cloudinary.com/dzatbpzyq/image/upload/v1672281261/hype-camper/rrn4dn6fuhypycyjdn8h.jpg',
          filename: 'hype-camper/rrn4dn6fuhypycyjdn8h',
        },
      ],
      geometry: { 
        type: 'Point', 
        coordinates: [-122.29214, 47.184901] 
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('Database saved successfully... Now autoclosing');
});
