import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getWorkoutData } from '../services/workoutServices.js';
import '../css/workout.css';

function Workouts(){
    const [workoutData, setWorkoutData] = useState(null);
    const [searchValue, setSearchValue] = useState();
    const [filteredData, setFilteredData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          const data = await getWorkoutData();
          setWorkoutData(data);
        };

        fetchData();
      }, []);

    const onSearchChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        console.log(searchValue);
        if (searchValue) {
            setFilteredData(workoutData.filter(workout => {
                console.log(workout.name);
                workout.name.toLowerCase().includes(searchValue.toLowerCase());
            }));
        }
    }

    return(
        <div>
            <h3 className="words">Welcome to the Workouts page!</h3>

            <button className="btn btn-success">
                <Link className="clean" to="/new-workout/">
                    Create a Workout
                </Link>
            </button>
            <br/><br/>

            <div>
                <label htmlFor="search" className="words">Search Workouts</label><br/>
                <input type="text" placeholder="Search by Name..." className="searchbar" value={searchValue} onChange={onSearchChange}/>
            </div>

            <div>
                <br/>
                {!workoutData ? 
                    <h3 className="words">Loading workouts...</h3> : 
                    <>

                        {!searchValue ? 
                            <>
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
                                        <br/>
                                    </>

                                ))}
                            </> : 

                            <>
                                {filteredData && filteredData.map((workout) => (

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
                                        <br/>
                                    </>
                                ))}
                            </>
                        }   
                    </>
                }   
            </div>
        </div>
    );
};

export default Workouts;