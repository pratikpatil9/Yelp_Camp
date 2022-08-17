const User = require("../Models/user");

const renderRegisterForm = (req,res)=>{
    res.render("users/register");
};

const register = async (req,res,next)=>{
    try{
    const {email, username, password} = req.body;
    const user = new User({email, username});
    const registerdUser = await User.register(user, password);
    // console.log(registerdUser);
    req.login(registerdUser,function(err){
        if(err){ return next(err)};
        req.flash("success","Welcome to YelpCamp!")
        res.redirect("/campgrounds");
    })
    }catch(e){
        req.flash("error", e.message);
        res.redirect("/register");
    }
};

const renderLoginForm = (req,res)=>{
    res.render("users/login");
};



const login = (req,res)=>{
    const redirectUrl = res.locals.returnTo || "/campgrounds";
    const{username} = req.body;
    req.flash("success",`Welcome back ${username}!`);
    res.redirect(redirectUrl);
};

const logout = (req,res)=>{
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash("success","Goodbye!");
        res.redirect('/campgrounds');
      });
};

module.exports = {
    renderRegisterForm,
    register,
    renderLoginForm,
    login,
    logout};