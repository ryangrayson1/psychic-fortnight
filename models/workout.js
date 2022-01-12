const mongoose = require('mongoose');

class Exercise {
    constructor(name, sets, reps){
        this.name = name;
        this.sets = sets;
        this.reps = reps;
    }
}

const workoutSchema = new mongoose.Schema({
    name: String,
    description: String,
    timeInMinutes: Number,
    difficulty: Number,
    exercises: Array, //of exercises
    creatorEmail: String
});

module.exports = mongoose.model('Workout', workoutSchema);