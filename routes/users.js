const express = require("express");
const app = express();
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const User = require("../Models/user");
const passport = require("passport");
const {checkReturnTo} = require("../middleware");
const users = require("../controllers/users");
const user = require("../Models/user");

router.route("/register")
    .get(users.renderRegisterForm)
    .post(catchAsync(users.register));

router.route("/login")
    .get(users.renderLoginForm)
    .post(checkReturnTo,passport.authenticate("local", {failureFlash:true,failureRedirect:"/login"}),users.login);

router.get("/logout",users.logout);

module.exports = router;