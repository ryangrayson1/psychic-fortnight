import axios from 'axios';

export const getWorkoutData = async () => {
    try {
        const res = await axios.get('/wor');
        return res.data;
      } catch (e) {
        console.error(e);
      }
}

export const createNewWorkout = async (name, description, timeInMinutes, difficulty, exercises, creatorEmail) => {
    const payload = {
        name,
        description,
        timeInMinutes,
        difficulty,
        exercises,
        creatorEmail
      };
      try {
        const res = await axios.post('/wor', payload);
        return res.data;
    } catch (e) {
        console.error(e);
      }
}

export const delWorkout = async (nm, wc) => {
    console.log(nm);
    console.log(wc);
    try {
        await axios.delete('/wor', {params:{name: nm, creatorEmail: wc}});
        alert("workout deleted");
    } catch (e) {
        console.error(e);
      }
}