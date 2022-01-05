const profileRouter = require('express').Router();
const Profile = require('../models/profile');

profileRouter.get('/', async (req, res) => {
      const profileInfo = await Profile.find({ email: });
      return res.json(profile.toJSON());
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