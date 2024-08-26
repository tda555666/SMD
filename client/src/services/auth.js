import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const baseAPIURL = 'http://localhost:3055';


export const login = async (formData) => {
    try {
        
        const result = await axios.post(`${baseAPIURL}/login`, formData);
        console.log(result);
        
        
        

        const { accessToken, refreshToken  } = result.data;
        let decoded = jwtDecode(accessToken);
        console.log(decoded);
        

        localStorage.setItem('auth-access-token', accessToken);
        localStorage.setItem('auth-refresh-token', refreshToken);
        localStorage.setItem('smduser',JSON.stringify(decoded));

        return { status: true, msg: 'Login is successful' };

    } catch (err) {
        console.log(err.message);
        return { status: false, msg: err.message };
    }
};