import axios from 'axios';

export const getWorkoutData = async () => {
    try {
        const res = await axios.get('/wor');
        return res.data;
      } catch (e) {
        console.error(e);
      }
}

export const createNewWorkout = async (name, description, timeInMinutes, difficulty, exercises) => {
    const payload = {
        name,
        description,
        timeInMinutes,
        difficulty,
        exercises
      };
      try {
        const res = await axios.post('/wor', payload);
        return res.data;
    } catch (e) {
        console.error(e);
      }
}