import axios from 'axios';


export const getData = async (userId , whatContent) => {
    try {
        
        const result = await axios.get(`${baseAPIURL}/${whatContent}/${userId}`, getAuthConfig() );
        console.log(result);
        

        return { status: true, data : result.data };

    } catch (err) {
        console.log(err.message);
        return { status: false, msg: err.message };
    }
};