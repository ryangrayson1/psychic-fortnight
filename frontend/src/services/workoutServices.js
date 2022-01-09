import axios from 'axios';

export const getWorkoutData = async () => {
    try {
        const res = await axios.get('/wor');
        return res.data;
      } catch (e) {
        console.error(e);
      }
}