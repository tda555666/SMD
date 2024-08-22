import axios from 'axios';

const baseAPIURL = 'http://localhost:3055/api';


export const login = async (formData,dispatchUser) => {

    try {

        const result = await axios.post(`${baseAPIURL}/auth/login`,formData);
        dispatchUser({type:'LOGIN',user:result.data.accessToken, 
                                   refreshToken: result.data.refreshToken})

        return {status: true, msg: 'The login is successful'}

    }catch(err) {

        console.log(err.message)
        return {status: false, msg: err.message}

    }

}