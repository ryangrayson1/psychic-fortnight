const workoutRouter = require('express').Router();
const Workout = require('../models/workout');

workoutRouter.get('/', async (req, res) => {
    const auth = req.currentUser;
      if (auth) {
        const workoutInfo = await Workout.find({}); //finding all workouts
        return res.json(workoutInfo);
      }
      return res.status(403).send('Not authorized');
});

workoutRouter.post('/', (req, res) => {
    var workoutData = {
        name: req.body.name,
        description: req.body.description,
        timeInMinutes: req.body.timeInMinutes,
        exercises: req.body.exercises,
        difficulty: req.body.difficulty,
    };
    const workout = new Workout(workoutData);
    const savedWorkout = workout.save();
    return res.status(201).json(savedWorkout);
});

// function testWorkoutRouterPost(){

// }

module.exports = workoutRouter;