const { string } = require("joi");
const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const schema = mongoose.Schema;
const Review = require("./review");
const User = require("./user");

const ImageSchema = new schema({
        url:String,
        filename: String
    });

ImageSchema.virtual("thumbnail").get(function(){
    return this.url.replace("/upload","/upload/w_200");
})
const opts = { toJSON: { virtuals: true } };
const CampgroundSchema = new schema({
    title: String,
    image: [ImageSchema],
    price: Number,
    description: String,
    location: String,
    geometry: {
        type:{
            type: String,
            enum: ["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    author:{
        type: schema.Types.ObjectId,
        ref: "User",
    },
    reviews:[{
        type: schema.Types.ObjectId,
        ref: "Review"
    }]
},opts)

CampgroundSchema.virtual("properties.popupMarkup").get(function(){
    return `<a href="/campgrounds/${this._id}">${this.title}</a>
    <p>${this.description.substring(0,20)}...<p>`;
})

CampgroundSchema.post("findOneAndDelete", async(doc)=>{
    if(doc){
        await Review.deleteMany({
            _id:{
                $in:doc.reviews
            }
        })
    }
})


module.exports = mongoose.model("Campground",CampgroundSchema);