const mongoose = require('mongoose');

class Exercise {
    constructor(name, sets, reps, time){
        this.name = name;
        this.sets = sets;
        this.reps = reps;
        this.time = time;
    }
}

const workoutSchema = new mongoose.Schema({
    name: String,
    description: String,
    timeInMinutes: Number,
    exercises: Array, //of exercises
    difficulty: Number
});

module.exports = mongoose.model('Workout', workoutSchema);