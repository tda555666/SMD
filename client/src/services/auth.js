import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


export const login = async (formData) => {
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



export const refresh = async (userId , setUser ) => {
     
    
    let refreshToken = localStorage.getItem('auth-refresh-token');

    
    if(!refreshToken){
        console.log('no refresh token in local storage');
        return {success: false}
        
    }

    console.log('going to refresh access token');

    try{
        console.log('trying to refresh');
        
        let result1 = await axios.patch(`${baseAPIURL}/user/refresh-token`, {userId ,refreshToken}, config);
        
        
        localStorage.setItem('auth-access-token', result1.data.accessToken);
        localStorage.setItem('auth-refresh-token', result1.data.refreshToken);
        return { success: true };

    }catch(err){
        console.log('that the error message in the refresh');
        
        console.log('message from the refresh' + ' ' + err.response.data.msg);
        
        logout(setUser)
        return{success: false}
        
    }
       
}

export const logout = async (setUser) => {

    const user = JSON.parse(localStorage.getItem('smdUser'));

    if(!user){
        return {success:false}
    }
    
    try{
        const response = await axios.patch(`${baseAPIURL}/user-delete-refresh/${user.id}`);

        localStorage.removeItem('auth-access-token');
        localStorage.removeItem('auth-refresh-token');
        localStorage.removeItem('smdUser');
    
        setUser({ role: 'guest' });
    
        return {success:true}
    }
    catch(err) {
        return {success:false}
    }

}

