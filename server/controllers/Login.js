import SchoolHeadModel from "../models/SheadModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ManagementModel from "../models/managementModel.js";
import TeacherModel from "../models/teacherModel.js";
import StudentModel from "../models/studentModel.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import fs from 'fs';
import path from 'path';
import { promisify } from 'util';


export const SchoolHeadCreateAccount = async (req, res) => {
    try {
        const { username, email, state, password } = req.body;
        const schoolCode = req.headers.code;

        if (!username || !email || !state || !schoolCode || !password) {
            return res.status(400).json({
                status: false,
                message: "All Fields are Required",
            });
        }

        const db = req.db;
        const SchoolHead = SchoolHeadModel(db);

        const jsonFilePath = path.join(__dirname, '../data/schoolCodes.json'); // Corrected path
        let schoolCodes = [];

        try {
            const fileContent = fs.readFileSync(jsonFilePath, 'utf-8');
            schoolCodes = JSON.parse(fileContent);
        } catch (err) {
            console.error("Error reading JSON file:", err);
        }

        if (schoolCodes.includes(schoolCode)) {
            return res.status(400).json({
                status: false,
                message: "School code already exists",
            });
        }

        const existUser = await SchoolHead.findOne({ email });
        if (existUser) {
            return res.status(400).json({
                status: false,
                message: "User already exists",
            });
        }

        const hashedPass = await bcrypt.hash(password, 10); // Increased salt rounds for better security

        const newSchoolHead = new SchoolHead({
            username,
            email,
            state,
            schoolCode,
            password: hashedPass,
        });

        await newSchoolHead.save();

        schoolCodes.push(schoolCode);
        fs.writeFileSync(jsonFilePath, JSON.stringify(schoolCodes, null, 2));

        return res.status(201).json({
            status: true,
            message: "User Created",
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: false,
            message: "Error while signing up the user",
        });
    }
};



export const loginSchoolHead = async (req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                status:false,
                message:"Both Email, Password are Required"
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
            const token = await jwt.sign(userWithoutPassword, process.env.jwt_secret_Management, { expiresIn: '25d' });
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
            const Student = StudentModel(req.db);
            const studentDetail = await Student.findOne({ rollNumber:email }).select('+password');
            if (!studentDetail) {
                return res.status(401).json({
                    status: false,
                    message: 'User Not Exist'
                })
            }
            console.log(password,studentDetail.password);
            if (!password===studentDetail.password) {
                return res.status(400).json({
                    status: false,
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = studentDetail.toObject();
            delete userWithoutPassword.password;
            delete userWithoutPassword.performance;
            const token = await jwt.sign(userWithoutPassword, process.env.jwt_secret_Student, { expiresIn: '25d' });
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
        console.log("role is here : ",role);
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
            console.log("Reached here")
            return res.status(401).json({
                status: false,
                message: "JWT not verified",
            });
        }
        console.log(error);
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