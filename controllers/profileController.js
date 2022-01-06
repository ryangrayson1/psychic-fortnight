const profileRouter = require('express').Router();
const Profile = require('../models/profile');

//need somthing to get the creds of the user who's logged in

profileRouter.get('/', async (req, res) => {
      const profileInfo = await Profile.find({}); //finding all profiles
      return res.json(profileInfo);
  });

profileRouter.post('/', (req, res) => {
    var userData = {
        firstName: req.body.fname,
        lastName: req.body.lname,
        email: req.body.email,
    };
    const profile = new Profile(userData);
    const savedProfile = profile.save();
    return res.status(201).json(savedProfile);
  });

module.exports = profileRouter;