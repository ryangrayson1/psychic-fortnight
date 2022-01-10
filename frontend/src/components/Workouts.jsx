import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorkoutData } from '../services/workoutServices.js';

function Workouts(){
    const [workoutData, setWorkoutData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getWorkoutData();
          setWorkoutData(data);
        };

        fetchData();
      }, []);

      if (workoutData){
          console.log(workoutData);
      }

    return(
        <div>
            <h3 className="words">Welcome to the Workouts page!</h3>
            <h4 className="words">this page is currently being developed. Check back later!</h4>

            <button className="btn btn-success">
                <Link className="clean" to="/new-workout/">
                    Create a Workout
                </Link>
            </button>
            <br/>

            <div>
                <br/>
                {!workoutData ? 
                <h3 className="words">Loading workouts...</h3> : 
                <>
                    {workoutData.map((workout) => (

                        <>
                            <div className="card workout-card bg-transparent border-primary words">
                                <div className="card-header bg-transparent border-primary">
                                    <b>{workout.name}</b>
                                </div>
                                <div className="card-body bg-transparent border-primary">
                                    <p>{workout.description}</p>
                                    Time: {workout.timeInMinutes} min  |  Difficulty: {workout.difficulty}/10
                                </div>

                                <div className="card-footer bg-transparent border-primary">
                                    <ul className="list-group list-group-flush bg-transparent border-success">
                                        {workout.exercises.map((exercise) => (
                                            <li className="list-group-item bg-transparent border-success"><div className="words">{exercise.exerciseName}: {exercise.sets} sets of {exercise.reps} reps.</div></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <br/>
                        </>

                    ))}
                </>}
            </div>
        </div>
    );
};

export default Workouts;