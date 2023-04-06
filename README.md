## Hype Camper

### [Live Preview](https://hype-camper.herokuapp.com/)

#### Hype Camper is a full stack CRUD website where users can create, review and manage campgrounds. This project was part of Colt Steele's full stack web dev course.
#### This project was created using Node.js, Express, MongoDB, EJS, and Bootstrap. Passport.js was used to handle authentication.

____

### Features
* Users can create, edit and remove campgrounds
* Users can review campgrounds and remove their reviews
* Map with location of campgrounds
* Users can create account, login and logout

____

### Images

#### Home Page:
![hype-camper-3](https://user-images.githubusercontent.com/82607849/211166972-4957a3dd-dfb4-4e6f-a9fa-b2146059672a.jpeg)

#### Campground:
![hype-camper-1](https://user-images.githubusercontent.com/82607849/211167137-4a7768de-8ffc-4e95-ac3f-225511c5a0cd.jpeg)

#### Login Card:
![hype-camper-2](https://user-images.githubusercontent.com/82607849/211167077-5663e92d-c0bc-438a-a2f5-45b3c8894b5c.jpeg)

____

### Getting Started:

To a get development copy up and running in your local machine follow this simple steps:

1. Fork this repository and clone it to your system or download zip code and extract it.
2. Make sure you have mongodb, node.js and npm installed on your system.
3. Open terminal on all three folders and run __npm i__ to install node_modules with all dependencies.
4. Create a Cloudinary account to get an cloud name, API key and secret code.
5. Create a Mapbox account to get an access token.

After that, you need to create a .env file in the root folder of the project and add the following code inside:

```
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
MAPBOX_TOKEN=<your_mapbox_token>
```

Replace <your_code_here> with the respective code given at the momment of the creation of the accounts.

Run nodemon app.js in the terminal on the project folder.

Access it with "http://localhost:3000/"

---

### Seeding with fake campgrounds
For testing purposes, you can seed fake campgrounds with random images and locations, for that you need to run:
```
node seeds/index.js
```
__Alert:__ That will __delete ALL__ campgrounds, reviews you have!!! And automatically generate random campgrounds.

This automatically generates 200 campgrounds with random locations and images, to change the amount of the campgrounds that are generated, go to seeds/index.js file and change the __number__ amount in __campgroundsCount__ variable. Them run the code above again, that will delete ALL campgrounds, reviews you have and generate everything again.

---

### License

Distributed under the __MIT__ License. See LICENSE.txt for more information.

### Contributing

---

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repository and create a pull request. You can also simply open an issue with the tag "improvement". Also please give to give the project a star! Thanks.
