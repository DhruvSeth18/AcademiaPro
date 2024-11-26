import SchoolHeadModel from "../models/SheadModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ManagementModel from "../models/managementModel.js";
import TeacherModel from "../models/teacherModel.js";
import StudentModel from "../models/studentModel.js";
import { promisify } from 'util';


// School Head Account is Created

export const SchoolHeadCreateAccount = async (req,res)=> {
    try{
        const {username,email,country,state,password} = req.body;
        if(!username || !email || !country || !state || !req.headers.code || !password){
            return res.status(400).json({
                status:false,
                message:"ALl Fields are Required"
            })
        }
        const db = req.db;
        const SchoolHead = SchoolHeadModel(db);
        console.log(req.body);
        const existUser = await SchoolHead.findOne({email});
        if(existUser){
            return res.status(400).json({
                status:false,
                message:"User already Existed"
            })
        }
        const HashedPass = await bcrypt.hash(password,5);
        const newSchoolHead = new SchoolHead({
            username:username,
            email:email,
            country:country,
            state:state,
            schoolCode:req.headers.code,
            password:HashedPass
        })
        await newSchoolHead.save();
        return res.status(201).json({
            status:true,
            message:"User Created"
        })
    } catch(error){
        console.log(error.message);
        return res.status(500).json({
            status:false,
            message:"Error while Sign up the message"
        })
    }
}





export const loginSchoolHead = async (req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                status:false,
                message:"Both Email, Password and roll are Required"
            })
        }
        if(role=="Head"){
            const SchoolHead = SchoolHeadModel(req.db);
            const head = await SchoolHead.findOne({ email:email }).select('+password');
            if (!head) {
                return res.status(401).json({
                    status: false,
                    message: 'User Not Exist'
                })
            }
            const { pass, ...userWithoutPassword } = head.toJSON();
            const ComparePass = await bcrypt.compare(password, head.password);
            if (!ComparePass) {
                return res.status(400).json({
                    status: false,
                    message: 'Either Username or Password is Invalid'
                })
            }
            const token = await jwt.sign(userWithoutPassword, process.env.jwt_secret_Head, { expiresIn: '25d' });
            return res
            .cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .cookie("role",role,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json({
                status: true,
                message: 'Login Success',
                token: `${token}`,
                data:userWithoutPassword
            });
        } else if(role==='Management'){
            const Management = ManagementModel(req.db);
            const management = await Management.findOne({ email:email }).select('+password');
            if (!management) {
                return res.status(401).json({
                    status: false,
                    message: 'User Not Exist'
                })
            }
            if(password!==management.password){
                return res.status(400).json({
                    status: false,
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = management.toObject();
            delete userWithoutPassword.password;
            const token = await jwt.sign(userWithoutPassword, process.env.Shead_key, { expiresIn: '25d' });
            return res
            .cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .cookie("role",role,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json({
                status: true,
                message: 'Login Success',
                token: `${token}`,
                role:role,
                data:userWithoutPassword
            })
        } else if(role==='Teacher'){
            const Teacher = TeacherModel(req.db);
            const teacherDetail = await Teacher.findOne({ email:email }).select('+password');
            if (!teacherDetail) {
                return res.status(401).json({
                    status: false,
                    message: 'User Not Exist'
                })
            }
            console.log(password,teacherDetail.password);
            if (!password===teacherDetail.password) {
                return res.status(400).json({
                    status: false,
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = teacherDetail.toObject();
            delete userWithoutPassword.password;
            const token = await jwt.sign(userWithoutPassword, process.env.jwt_secret_Teacher, { expiresIn: '25d' });
            return res
            .cookie("token",token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .cookie("role",role,{
                httpOnly:true,
                secure:process.env.NODE_ENV === "production",
                maxAge: 7 * 24 * 60 * 60 * 1000,
            })
            .status(200)
            .json({     
                status: true,
                message: 'Login Success',
                role:role,
                token: `${token}`,
                data:userWithoutPassword
            })
        } else if(role==="Student"){    
            
        }
    }catch(error){
        console.log(error);
        return res.status(500).json({
            status:false,
            message:"Error while log in the user"
        })
    }
}




export const verifyUser = async (req, res) => {
    try {
        const role = req.cookies.role;
        if (!role) {
            return res.status(401).json({
                status: false,
                message: "Role is missing",
            });
        }
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                status: false,
                message: "Token is missing",
            });
        }
        let secret;
        if (role === 'Head') {
            secret = process.env.jwt_secret_Head;
        } else if (role === 'Student') {
            secret = process.env.jwt_secret_Student;
        } else if (role === 'Management') {
            secret = process.env.jwt_secret_Management;
        } else if (role === 'Teacher') {
            secret = process.env.jwt_secret_Teacher;
        } else {
            return res.status(401).json({
                status: false,
                message: "Invalid role",
            });
        }
        const verify = await promisify(jwt.verify)(token, secret);
        if (!verify) {
            return res.status(401).json({
                status: false,
                message: "JWT not verified",
            });
        }
        delete verify.password;
        return res.status(200).json({
            status: true,
            data: verify,
        });
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                status: false,
                message: "JWT not verified",
            });
        }
        return res.status(500).json({
            status: false,
            message: "Internal Error -> Verify User",
        });
    }
};


export const logout = (req,res)=>{
    try{
        return res
        .clearCookie("token", { path: "/", httpOnly: true })
        .status(200)
        .json({
            status:true,
            message:"Cookie Cleared"
        });
    } catch(error){
        console.log(error.message);
        return res.status(401).json({
            status:false,
            message:"Error logging out"
        })
    }
}