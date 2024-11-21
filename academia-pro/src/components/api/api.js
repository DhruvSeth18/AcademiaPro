import axios from 'axios';
const url = 'http://localhost:8000/api';

export const LoginStudentHead = async (data)=>{
    try{
        const response = await axios.post(`${url}/login`,data,{
            timeout:6000,
            headers: {     // Headers
                'Content-Type': 'application/json',
                code:localStorage.getItem("code")
            },
        })
        console.log(response.data.role);
        if(response.status===200){
            return{
                status:response.data.status,
                username:response.data.username,
                email:response.data.email,
                userId:response.data.id,
                token:response.data.token,
                code:response.data.schoolCode,
                class:response.data.class,
                subject:response.data.subject,
                role:response.data.role
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

export const ClassStudent = async ()=>{
    try{
        const response = await axios.get(`${url}/class/${localStorage.getItem('class')}`,{
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code")
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                class:response.data.class
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

export const MarkAttendence = async (studentId)=>{
    try{
        const response = await axios.post(`${url}/attendance`,{studentId:studentId,classId:localStorage.getItem('class')},{
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code")
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                marked:response.data.marked
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
export const GetStudentAttendence = async (studentId)=>{
    try{
        const response = await axios.get(`${url}/attendance?studentId=${studentId}`,{
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code"),
                classid:localStorage.getItem('class')
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                marked:response.data.marked
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
export const GetStudents = async (data)=>{
    try{
        console.log(data);
        const response = await axios.get(`${url}/students`,{
            params:data,
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code")
            },
        })
        
        if(response.status===200){
            return{
                status:response.data.status,
                data : response.data.data
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

export const UpdateStudentExam = async (studentId,data)=>{
    try{
        const response = await axios.post(`${url}/students/${studentId}`,data,{
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code"),
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                message:response.data.message,
                data:response.data.data
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
export const getClass = async ()=>{
    try{
        const response = await axios.get(`${url}/class`,{
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code"),
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                data:response.data.data
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
export const getTeachers = async ()=>{
    try{
        const response = await axios.get(`${url}/teachers`,{
            timeout:6000,
            headers: {
                'Content-Type': 'application/json',
                code:localStorage.getItem("code"),
            },
        })
        if(response.status===200){
            return{
                status:response.data.status,
                data:response.data.data
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