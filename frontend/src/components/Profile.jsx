import React, { useState, useEffect } from 'react';
import { getProfileData } from '../services/profileServices.js';
import { getWorkoutData, delWorkout } from '../services/workoutServices.js';
import fire from '../fire.js';

function Profile() {
    const [profileData, setProfileData] = useState(null);
    const [workoutData, setWorkoutData] = useState(null);

    //getting user-specific profile data...
    useEffect(() => {
        function checkEmail(e){
            return e.email === fire.auth().currentUser.email;
        };

        const fetchData = async () => {
          const data = await getProfileData();
          setProfileData(data.find(checkEmail));
        };

        fetchData();
      }, []);

      //getting user's workouts
      useEffect(() => {
        function checkEmail(w){
            return w.creatorEmail === fire.auth().currentUser.email;
        };

        const fetchData = async () => {
          const data = await getWorkoutData();
          setWorkoutData(data.filter(checkEmail));
        };

        fetchData();
      }, []);

      function deleteWorkout(name, ce) {
          return delWorkout(name, ce);
      }
    return(
        <div>    
            {!profileData ? 
                <h3 className="clean">Loading profile data...</h3> : 
                <>
                <h2 className="words">Welcome, {profileData.firstName}</h2><br/>
                <h2 className="clean dataexample">Personal Info</h2>
                <table id="dataTable" className="table clean profiletable">
                    <tbody className="clean">
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                        <tr>
                            <th>{profileData.firstName}</th>
                            <th>{profileData.lastName}</th>
                            <th>{profileData.email}</th>
                        </tr>
                    </tbody>
                </table>
                </>
            }

            {!workoutData ? 
                <h3 className="clean">You have no workouts</h3> : 
                <>
                    <h3 className="clean">Your Workouts:</h3>
                    {workoutData.map((workout) => (
                        <>
                            <div className="card workout-card bg-transparent border-primary words">
                                <div className="card-header bg-transparent border-primary">
                                    <b><h3>{workout.name}</h3></b>
                                    <h6>by {workout.creatorEmail}</h6>
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
                            <button onClick={() => deleteWorkout(workout.name, workout.creatorEmail)} className="btn btn-danger active">
                                Delete this Workout
                            </button>
                            <br/>
                            <br/>
                        </>
                    ))}
                </>
            }
        </div>
    )
};

export default Profile;