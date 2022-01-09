'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv').config();
const path = require('path');
const profileRouter = require('./controllers/profileController.js')
const workoutRouter = require('./controllers/workoutController.js')
const decodeIDToken = require('./authenticateToken.js');
const app = express();

mongoose.connect(
  process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Connected to database');
})
.catch((err) => {
  console.log('Error connecting to DB', err.message);
});

app.use(cors());
app.use(express.json());
app.use(decodeIDToken);
app.use(express.static(path.resolve(__dirname, './frontend/build')));
app.use('/pro', profileRouter);
//app.use('/wor', workoutRouter);

//placeholder
app.get('/wor', (req, res) => {
  res.send([
    {
    "name": "push", 
    "description": "simple chest and tris workout", 
    "timeInMinutes": 60, 
    "exercises": [
      {
        "name": "bench press",
        "sets": 5,
        "reps": 5
      },
      {
        "name": "incline dumbell",
        "sets": 4,
        "reps": 10
      },
      {
        "name": "flies",
        "sets": 3,
        "reps": 12
      }
    ],
    "difficulty": "6"
  },
  {
    "name": "pull", 
    "description": "simple back and bis workout", 
    "timeInMinutes": 45, 
    "exercises": [
      {
        "name": "pullups",
        "sets": 4,
        "reps": 8
      },
      {
        "name": "bent over rows",
        "sets": 4,
        "reps": 10
      },
      {
        "name": "barbell curls",
        "sets": 3,
        "reps": 12
      }
    ],
    "difficulty": "6"
  },
  ]
  );
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
