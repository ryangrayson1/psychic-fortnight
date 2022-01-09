import React from 'react';
import { useNavigate } from 'react-router-dom';

function NewWorkout() {
    const navigate = useNavigate();

    return(
        <div>
            <br/><h4 className="words">Create a new Workout</h4>
        </div>
    );
};

export default NewWorkout;