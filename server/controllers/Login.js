import SchoolHeadModel from "../models/SheadModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ManagementModel from "../models/managementModel.js";
import TeacherModel from "../models/teacherModel.js";


export const SchoolHeadCreateAccount = async (req,res)=> {
    try{
        const {username,email,country,state,password} = req.body;
        if(!username || !email || !country || !state || !req.headers.code || !password){
            return res.status(400).json({
                status:"fail",
                message:"ALl Fields are Required"
            })
        }
        const SchoolHead = SchoolHeadModel(req.db);
        const existUser = await SchoolHead.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(existUser){
            return res.status(400).json({
                status:"fail",
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
            status:"success",
            message:"User Created"
        })
    } catch(error){
        console.log(error.message);
        return res.status(500).json({
            status:"fail",
            message:"Error while Sign up the message"
        })
    }
}



export const loginSchoolHead = async (req,res)=>{
    try{
        const {email,password,role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({
                status:'fail',
                message:"Both Email, Password and roll are Required"
            })
        }
        if(role=="Head"){
            const SchoolHead = SchoolHeadModel(req.db);
            const head = await SchoolHead.findOne({ email:email }).select('+password');

            if (!head) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User Not Exist'
                })
            }
    
            const { pass, ...userWithoutPassword } = head.toJSON();
            const ComparePass = await bcrypt.compare(password, head.password);
    
            if (!ComparePass) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Either Username or Password is Invalid'
                })
            }
            const jsonToken = await jwt.sign(userWithoutPassword, process.env.Shead_key, { expiresIn: '25d' });
            return res.status(200).json({
                status: 'success',
                message: 'Login Success',
                id: head._id,
                token: `Bearer ${jsonToken}`,
                username: head.username,
                admin: head.admin,
                schoolCode:head.schoolCode,
                country:head.country,
                state:head.state,
                email:head.email,
                role:head.role
            })
        } else if(role==='Management' || role.includes("Principal")){
            const Management = ManagementModel(req.db);
            const management = await Management.findOne({ email:email }).select('+password');
            if (!management) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User Not Exist'
                })
            }
            if(password!==management.password){
                return res.status(400).json({
                    status: 'fail',
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = management.toObject();
            delete userWithoutPassword.password;
            const jsonToken = await jwt.sign(userWithoutPassword, process.env.Shead_key, { expiresIn: '25d' });
            return res.status(200).json({
                status: 'success',
                message: 'Login Success',
                id: management._id,
                token: `Bearer ${jsonToken}`,
                username: management.username,
                schoolCode:management.schoolCode,
                email:management.email,
                role:management.role
            })
        } else if(role==='Teacher'){
            const Teacher = TeacherModel(req.db);
            const teacherDetail = await Teacher.findOne({ email:email }).select('+password');
            if (!teacherDetail) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User Not Exist'
                })
            }
            console.log(password,teacherDetail.password);
            if (!password===teacherDetail.password) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = teacherDetail.toObject();
            delete userWithoutPassword.password;
            const jsonToken = await jwt.sign(userWithoutPassword, process.env.Shead_key, { expiresIn: '25d' });
            return res.status(200).json({
                status: 'success',
                message: 'Login Success',
                id: teacherDetail._id,
                token: `Bearer ${jsonToken}`,
                username: teacherDetail.name,
                schoolCode:teacherDetail.schoolCode,
                email:teacherDetail.email,
                role:teacherDetail.role,
                class:teacherDetail.class,
                subject:teacherDetail.subject
            })
        }
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            status:'fail',
            message:"Error while log in the user"
        })
    }
}