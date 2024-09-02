import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const getData = async (formData) => {
    try {
        
        const result = await axios.post(`${baseAPIURL}/login`, formData);
        console.log(result);

        const { accessToken, refreshToken  } = result.data;
        let decoded = jwtDecode(accessToken);
        console.log(decoded);
        

        localStorage.setItem('auth-access-token', accessToken);
        localStorage.setItem('auth-refresh-token', refreshToken);
        localStorage.setItem('smdUser',JSON.stringify(decoded));

        return { status: true, msg: 'Login is successful' };

    } catch (err) {
        // Check if response exists to provide better error details
        if (err.response) {
            console.error('Response error:', err.response.data);
            console.error('Response status:', err.response.status);
            console.error('Response headers:', err.response.headers);
            return { status: false, msg: err.response.data.message || 'An error occurred' };
        } else if (err.request) {
            console.error('Request error:', err.request);
            return { status: false, msg: 'No response received from server' };
        } else {
            console.error('Error message:', err.message);
            return { status: false, msg: err.message };
        }
    }
};

