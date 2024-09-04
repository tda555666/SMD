import axios from 'axios';
import { updateTokens } from './auth';

export const getData = async (userId , whatContent) => {
    try {
        
        const result = await axios.get(`${baseAPIURL}/${whatContent}/${userId}`, getAuthConfig() );
        console.log(result);
        
        updateTokens(result)
        return { status: true, data : result.data };

    } catch (err) {
        console.log(err.response.data.msg);
        return { status: false, msg:err.response.data.msg };
    }
};