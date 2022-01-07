import axios from 'axios';
import fire from '../fire.js';


const createToken = async () => {
  const user = fire.auth().currentUser;
  const token = user && (await user.getIdToken());
  const payloadHeader = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  return payloadHeader;
};

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
            const res = await axios.post('/pro', payload);
            return res.data;
        } catch (e) {
            console.error(e);
          }

    } catch (error) {
        console.log(error.message);
    }
};

export const getProfileData = async () => {
  const header = await createToken();
    try {
        const res = await axios.get('/pro', header);
        return res.data;
      } catch (e) {
        console.error(e);
      }
}