
import axios from 'axios';
import { adminApi } from '../../api';

//Update Admin Profoile api 
export const updateAdminProfileApiCall = async (data) => {
    const { email, ...rest } = data
    const formData = {
        "email": email,
        "user_info": rest
    }
    return await axios.post(adminApi.profile, formData,
        //{ headers: loginTokenHeader() }
    )
}

//Get Admin Profoile api 
export const getAdminProfileApiCall = async () => {

    return await axios.get(adminApi.profile,
        //{ headers: loginTokenHeader() }
    )
}
