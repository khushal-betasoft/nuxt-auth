import axios from 'axios'
export const loginAuth = async ({ email, password }) => {
    alert("entered")
    try {
        console.log(axios);
        alert("hold")
        const response = await axios.get(' https://devapi.spworldwide.co.uk/api/auth/login', { email, password });
        alert(response);
        return response;
    }
    catch (err) {
        return err;
    }
}
export const registerAuth = async (userData) => {
    console.log(axios)
    try {
        const response = await axios.post(' https://devapi.spworldwide.co.uk/api/auth/login', userData);
        console.log(response);
        return response;
    }
    catch (err) {
        return err;
    }
}
