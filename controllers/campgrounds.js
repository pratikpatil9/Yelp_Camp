
const Campground = require("../Models/campground");
const {cloudinary} = require("../cloudinary");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapboxToken = process.env.mapbox_token;
const geocoder = mbxGeocoding({accessToken:mapboxToken});


const index = async(req,res)=>{
    const campgrounds =  await Campground.find();
    res.render("campgrounds/index",{campgrounds});
};

const showCampground = async(req,res)=>{
    const { id } = req.params;
    const campground = await Campground.findById(id).populate({
        path: "reviews",
        populate:{
            path:"author"
        }
    }).populate("author");
    // console.log(campground);
    if(!campground){
        req.flash("error","Cannot find the campground!");
        return res.redirect("/campgrounds");
    }
    res.render("campgrounds/show",{campground});
};

const renderNewForm = (req,res)=>{
    res.render("campgrounds/new");
};

const createCampground = async (req,res)=>{
    const geodata = await geocoder.forwardGeocode({
        query: req.body.campground.location,
        limit: 1
    }).send();
    const campground = new Campground(req.body.campground);
    campground.geometry = geodata.body.features[0].geometry;
    campground.image = req.files.map(f => {
        return {url:f.path, filename:f.filename}
    })
    campground.author = req.user._id;
    await campground.save();
    console.log(campground);
    req.flash("success","Successfully made a new campground!");
    res.redirect(`/campgrounds/${campground._id}`);

};

const renderEditForm = async(req,res)=>{
    const{id} = req.params;
    const campground = await Campground.findById(id);
    res.render("campgrounds/edit",{campground});
};

const updateCampground = async (req,res)=>{
    const{id} = req.params;
    // console.log(req.body);
    const campground = await Campground.findByIdAndUpdate(id,req.body.campground,{runValidators:true,new:true});

    const images = req.files.map(f => {
        return {url:f.path, filename:f.filename}
    })
    campground.image.push(...images);
    await campground.save();
    // console.log(campground);
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
        await campground.updateOne({$pull:{image:{filename:{$in: req.body.deleteImages}}}});
        console.log(campground);
    }
    req.flash("success","Successfully updated a campground!");
    res.redirect(`/campgrounds/${campground._id}`);
};

const deleteCampground = async(req,res)=>{
    const{id} = req.params;
    await Campground.findByIdAndDelete(id);
    req.flash("success","Successfully deleted a campground!");
    res.redirect("/campgrounds");
};

module.exports = {index,
    showCampground,
    renderNewForm,
    createCampground,
    renderEditForm,
    updateCampground,
    deleteCampground}; 