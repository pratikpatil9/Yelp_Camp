const express = require("express");
const router = express.Router();
const Campground = require("../Models/campground");
const ExpressError = require("../utils/ExpressError");
const catchAsync = require("../utils/catchAsync");
const {isLoggedIn,isAuthor,validateCampground} = require("../middleware");
const campgrounds = require("../controllers/campgrounds");
const multer = require("multer");
const{storage} = require("../cloudinary");
const upload = multer({storage});

//new 
router.get("/new",isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    //delete
    .delete(isLoggedIn,isAuthor,catchAsync(campgrounds.deleteCampground))
    //update
    .put(isLoggedIn,isAuthor,upload.array("image"),validateCampground,catchAsync(campgrounds.updateCampground))
    //show
    .get(catchAsync(campgrounds.showCampground));

//edit
router.get("/:id/edit",isLoggedIn,isAuthor,campgrounds.renderEditForm);


router.route("/")
    //create
    .post(isLoggedIn,upload.array("image"),validateCampground,catchAsync(campgrounds.createCampground))
    //index
    .get(catchAsync(campgrounds.index));


module.exports = router;