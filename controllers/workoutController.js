const workoutRouter = require('express').Router();
const Workout = require('../models/workout');
const Confirm = require('prompt-confirm');

workoutRouter.get('/', async (req, res) => {
    try{
        const workoutInfo = await Workout.find({}); //finding all workouts
        return res.json(workoutInfo);
    }
      catch(err) {
        console.log(err);
      }
});

workoutRouter.post('/', (req, res) => {
    var workoutData = {
        name: req.body.name,
        description: req.body.description,
        timeInMinutes: req.body.timeInMinutes,
        exercises: req.body.exercises,
        difficulty: req.body.difficulty,
        creatorEmail: req.body.creatorEmail
    };
    const workout = new Workout(workoutData);
    const savedWorkout = workout.save();
    return res.status(201).json(savedWorkout);
});

workoutRouter.delete('/', async (req, res) => {
    const deleteStatus = await Workout.deleteOne({name: req.query.name, creatorEmail: req.query.creatorEmail});
    return res.json(deleteStatus);
})

module.exports = workoutRouter;