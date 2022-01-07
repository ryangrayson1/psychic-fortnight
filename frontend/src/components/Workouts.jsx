import React from 'react';
import { Link } from 'react-router-dom';

function Workouts(){

    return(
        <div>
            <h3 className="words">Welcome to the Workouts page!</h3>
            <h4 className="words">this page is currently being developed. Check back later!</h4>

            <button className="btn btn-success">
                <Link className="clean" to="/new-workout/">
                    Create a Workout
                </Link>
            </button>
        </div>
    );
};

export default Workouts;