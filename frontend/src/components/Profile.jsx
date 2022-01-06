import React, { useState, useEffect } from 'react';
import { getProfileData } from '../services/profileServices.js';
import fire from '../fire.js';

function Profile() {
    //getting data from backend... (profile data as JSON)
    const [profileData, setProfileData] = useState(null);
     
    useEffect(() => {
        const fetchData = async () => {
          const data = await getProfileData();
          setProfileData(getUser(data));
        }
        fetchData();
      }, []);

    const getUser = (data) => {
        return data.find(checkEmail);
    };

    function checkEmail(e){
        return e.email === fire.auth().currentUser.email;
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
        </div>
    )
};

export default Profile;