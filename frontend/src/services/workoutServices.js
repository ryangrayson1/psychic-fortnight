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
        alert("workout successfully created");
        return res.data;
    } catch (e) {
        alert("There was a problem creating your workout. please try again.")
        console.error(e);
      }
}

export const delWorkout = async (nm, wc) => {
    const sure = window.confirm("Are you sure you want to delete this workout?");
    if (sure){
        try {
            await axios.delete('/wor', {params:{name: nm, creatorEmail: wc}});
            alert("Workout deleted. Refresh the page to view changes.");
        } catch (e) {
            console.error(e);
        }
    }
    else{
        alert("Deletion Cancelled");
    }
}