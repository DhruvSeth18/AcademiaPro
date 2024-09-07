import axios from 'axios';
const url = 'http://localhost:8000/api';

export const LoginStudentHead = async (data)=>{
    try{
        const response = await axios.post(`${url}/login`,data,{
            timeout:4000,
            headers: {     // Headers
                'Content-Type': 'application/json',
                code:data.code
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                username:response.data.username,
                email:response.data.email,
                userId:response.data.id,
                token:response.data.token,
            }
        }
    } catch(error){
        if (error.response?.status >= 400) {
            return {
                status: error.response.data.status,
                message: error.response.data.message
            }
        }
        return {
            message: "Internet is slow Try Again"
        }
    }
}

