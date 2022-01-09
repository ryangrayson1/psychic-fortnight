const mongoose = require('mongoose');

class Exercise {
    constructor(name, sets, reps, time);
}

const workoutSchema = new mongoose.Schema({
    name: String,
    description: String,
    timeInMinutes: Number,
    exercises: Array, //of exercises
    difficulty: Number
});

module.exports = mongoose.model('Workout', workoutSchema);