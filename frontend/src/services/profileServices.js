import axios from 'axios';
import fire from '../fire.js';

const url = 'http://localhost:3001/pro';

export const createNewProfile = async (fname, lname, email, pword) => {
    try {
        const user = await fire.auth().createUserWithEmailAndPassword(email, pword);
        console.log(user.uid);

        const payload = {
            fname,
            lname,
            email,
          };
          try {
            const res = await axios.post(url, payload);
            return res.data;
        } catch (e) {
            console.error(e);
          }

    } catch (error) {
        console.log(error.message);
    }
};

export const getProfileData = async () => {
    try {
        const res = await axios.get(url);
        return res.data;
      } catch (e) {
        console.error(e);
      }
}