const mongoose = require("mongoose");
const Campground = require("../Models/campground");
const cities = require("./cities.js")
const {descriptors,places} = require("./seedHelpers.js")
async function main() {
  await mongoose.connect('mongodb://localhost:27017/yelp-camp');
}
main()
.then(res => {
    console.log("mongo server open")
})
.catch(err => console.log(err));

const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () =>{
  await Campground.deleteMany({});
  for(let i = 0; i < 50; i++){
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    new Campground({
      author: "62eccba68ec6c300b3701e9d",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      geometry : { type : "Point", coordinates : [cities[random1000].longitude, cities[random1000].latitude] },
      title:`${sample(descriptors)},${sample(places)}`,
      image:[
        {
          url: 'https://res.cloudinary.com/drhwxaylm/image/upload/v1660204641/Yelpcamp/ogcjdktneif0editubvt.avif',
          filename: 'Yelpcamp/ogcjdktneif0editubvt'
          
        },
        {
          url: 'https://res.cloudinary.com/drhwxaylm/image/upload/v1660204641/Yelpcamp/o4juwnazvfnskai7idnf.avif',
          filename: 'Yelpcamp/o4juwnazvfnskai7idnf'
          
        },
        {
          url: 'https://res.cloudinary.com/drhwxaylm/image/upload/v1660204642/Yelpcamp/myjbh55ercbq19knmm8e.avif',
          filename: 'Yelpcamp/myjbh55ercbq19knmm8e'
        }
      ],
      price,
      description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam beatae error aspernatur nihil laborum, sunt veniam repellendus aliquid qui! Amet natus ad, veritatis deserunt iure vel aliquid facilis voluptatibus id."
    }).save()
  }
}

seedDB();