import axios from 'axios';
import { refresh } from './auth';

export const getData = async (userId , whatContent ,setUser) => {
    try {
        
        const result = await axios.get(`${baseAPIURL}/${whatContent}/${userId}`, getAuthConfig() );
        console.log(result);
        
        return { status: true, data : result.data };

    } catch (err) {
        console.log(err.response.data.msg);

        if (err.response.status == "403"){

            console.log('asking for refresh');
            let result = await refresh(userId, setUser);
            console.log('that the result from sending the refresh token');
            console.log(result);
            

            if(result.success){
                try {

                console.log('before second try , and checking for access token from the local storage');
                console.log(localStorage.getItem('auth-access-token'));
                
                const result = await axios.get(`${baseAPIURL}/${whatContent}/${userId}`, getAuthConfig());
                console.log('after second try ');
                
                return { status: true, data : result.data };

                }catch(err){
                    return { status: false, msg:err.response.data.msg };
                }
            }
        }
        return { status: false, msg:err.response.data.msg };
    }
};


export const deleteTask = async (taskId) => {
    try {
        let result = await axios.delete(`${baseAPIURL}/tasks/${taskId}`);
        alert('Task deleted successfully');
        return { status: true, data : result.data };

    } catch (error) {
        console.error('There was an error deleting the task!', error);
        alert('Failed to delete the task');
        
    }
};