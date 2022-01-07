import React, { useState, useEffect } from 'react';
import { getProfileData } from '../services/profileServices.js';
import fire from '../fire.js';

function Profile() {
    const [profileData, setProfileData] = useState(null);

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
        </div>
    )
};

export default Profile;