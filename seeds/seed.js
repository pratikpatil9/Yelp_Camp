const inJson = require("./in.json");
const mongoose = require("mongoose");
const Campground = require("../Models/campground");
const cities = require("./cities.js");
const { descriptors, places } = require("./seedHelpers.js");
async function main() {
  await mongoose.connect(
    "mongodb+srv://lightning:lightning1@lightning.6tu7kyz.mongodb.net/?retryWrites=true&w=majority"
  );
}
main()
  .then((res) => {
    console.log("mongo server open");
  })
  .catch((err) => console.log(err));

const sample = (array) => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 406);
    const price = Math.floor(Math.random() * 20) + 10;
    new Campground({
      author: "62fcc3966e19c86c237975f2",
      location: `${inJson[random1000].city}, ${inJson[random1000].admin_name}`,
      geometry: {
        type: "Point",
        coordinates: [inJson[random1000].lng, inJson[random1000].lat],
      },
      title: `${sample(descriptors)},${sample(places)}`,
      image: [
        {
          url: "https://res.cloudinary.com/drhwxaylm/image/upload/v1678273032/Yelpcamp/mqdatsymtc597xhv763a.jpg",
          filename: "Yelpcamp/mqdatsymtc597xhv763a",
        },
        {
          url: "https://res.cloudinary.com/drhwxaylm/image/upload/v1678273034/Yelpcamp/phc5cqrumn1auh5kchdl.jpg",
          filename: "Yelpcamp/phc5cqrumn1auh5kchdl",
        },
        {
          url: "https://res.cloudinary.com/drhwxaylm/image/upload/v1678273118/Yelpcamp/hnjnopzbwg0f1bggnf0y.jpg",
          filename: "Yelpcamp/hnjnopzbwg0f1bggnf0y",
        },
      ],
      price,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam beatae error aspernatur nihil laborum, sunt veniam repellendus aliquid qui! Amet natus ad, veritatis deserunt iure vel aliquid facilis voluptatibus id.",
    }).save();
  }
};

seedDB();
