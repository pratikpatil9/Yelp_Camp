const express = require("express");
const router = express.Router({mergeParams:true});
const catchAsync = require("../utils/catchAsync");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware");
const reviews = require("../controllers/reviews");


//delete review
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview));
//new review
router.post("/",isLoggedIn,validateReview,catchAsync(reviews.createReview));

module.exports = router;