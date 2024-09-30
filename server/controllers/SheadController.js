import SchoolHead from "../models/SheadModel.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ManagementModel from "../models/managementModel.js";
import TeacherModel from "../models/teacherModel.js";

// Create Account for AcademiaPro

/**
 * @swagger
 * /school-head/create:
 *   post:
 *     summary: Create a new School Head account
 *     tags: [SchoolHead]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "john_doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               country:
 *                 type: string
 *                 example: "USA"
 *               state:
 *                 type: string
 *                 example: "California"
 *               schoolCode:
 *                 type: string
 *                 example: "SCH123"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: School Head account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: User Created
 *       400:
 *         description: Bad Request - Missing required fields or user already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: All Fields are Required or User already Existed
 *       500:
 *         description: Server error - Error while creating the account
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error while Sign up the message
 */


export const SchoolHeadCreateAccount = async (req,res)=> {
    try{
        const {username,email,country,state,password} = req.body;
        if(!username || !email || !country || !state || !req.headers.code || !password){
            return res.status(400).json({
                status:"fail",
                message:"ALl Fields are Required"
            })
        }
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


// login SchoolHead with AcademiaPro

/**
 * @swagger
 * /school-head/login:
 *   post:
 *     summary: Login School Head
 *     tags: [SchoolHead]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful, returns JWT token and user details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Login Success
 *                 id:
 *                   type: string
 *                   example: "1234567890abcdef"
 *                 token:
 *                   type: string
 *                   example: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 admin:
 *                   type: boolean
 *                   example: false
 *                 schoolCode:
 *                   type: string
 *                   example: "SCH123"
 *                 country:
 *                   type: string
 *                   example: "USA"
 *                 state:
 *                   type: string
 *                   example: "California"
 *                 email:
 *                   type: string
 *                   example: "john.doe@example.com"
 *       400:
 *         description: Bad Request - Missing email or password, or invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Either Username or Password is Invalid
 *       401:
 *         description: Unauthorized - User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: User Not Exist
 *       500:
 *         description: Server error - Error while logging in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error while log in the user
 */


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
            const findschoolHead = await SchoolHead.findOne({ email:email }).select('+password');

            if (!findschoolHead) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User Not Exist'
                })
            }
    
            const { pass, ...userWithoutPassword } = findschoolHead.toJSON();
            const ComparePass = await bcrypt.compare(password, findschoolHead.password);
    
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
                id: findschoolHead._id,
                token: `Bearer ${jsonToken}`,
                username: findschoolHead.username,
                admin: findschoolHead.admin,
                schoolCode:findschoolHead.schoolCode,
                country:findschoolHead.country,
                state:findschoolHead.state,
                email:findschoolHead.email,
                role:findschoolHead.role
            })
        } else if(role==='Management' || role.includes("Principal")){
            const findManagement = await ManagementModel.findOne({ email:email }).select('+password');
            if (!findManagement) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User Not Exist'
                })
            }
            if(password!==findManagement.password){
                return res.status(400).json({
                    status: 'fail',
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = findManagement.toObject();
            delete userWithoutPassword.password;

            const jsonToken = await jwt.sign(userWithoutPassword, process.env.Shead_key, { expiresIn: '25d' });
            return res.status(200).json({
                status: 'success',
                message: 'Login Success',
                id: findManagement._id,
                token: `Bearer ${jsonToken}`,
                username: findManagement.username,
                schoolCode:findManagement.schoolCode,
                email:findManagement.email,
                role:findManagement.role
            })
        } else if(role==='Teacher'){
            const findTeacher = await TeacherModel.findOne({ email:email }).select('+password');
            console.log(findTeacher);
            if (!findTeacher) {
                return res.status(401).json({
                    status: 'fail',
                    message: 'User Not Exist'
                })
            }
            const ComparePass = await bcrypt.compare(password, findTeacher.password);
    
            if (!ComparePass) {
                return res.status(400).json({
                    status: 'fail',
                    message: 'Either Username or Password is Invalid'
                })
            }
            const userWithoutPassword = findTeacher.toObject();
            delete userWithoutPassword.password;
            const jsonToken = await jwt.sign(userWithoutPassword, process.env.Shead_key, { expiresIn: '25d' });
            return res.status(200).json({
                status: 'success',
                message: 'Login Success',
                id: findTeacher._id,
                token: `Bearer ${jsonToken}`,
                username: findTeacher.name,
                schoolCode:findTeacher.schoolCode,
                email:findTeacher.email,
                role:findTeacher.role,
                class:findTeacher.class,
                subject:findTeacher.subject
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