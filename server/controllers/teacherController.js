import ClassModel from '../models/ClassModel.js';
import TeacherModel from '../models/teacherModel.js';
import bcrypt from 'bcrypt';


export const addTeacher = async (req, res) => {
    try {
        const { name, email, password, subject,classId} = req.body;
        const schoolCode = req.headers.code;
        // Validate request data
        if (!name || !email || !password || !subject || !schoolCode) {
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required',
            });
        }

        // Check if the teacher already exists
        const existingTeacher = await TeacherModel.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                status: 'fail',
                message: 'Teacher already exists with this email',
            });
        }

        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new teacher
        const newTeacher = new TeacherModel({
            name,
            email,
            password,
            class:classId,
            subject,
            schoolCode,
        });
        
        const classData = await ClassModel.findById(classId);
        console.log(newTeacher._id);
        classData.classTeacher = newTeacher._id;

        await classData.save();
        await newTeacher.save();

        return res.status(201).json({
            status: 'success',
            message: 'Teacher created successfully',
            data: newTeacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while creating teacher',
        });
    }
};


export const getTeachers = async (req, res) => {
    try {
        const teachers = await TeacherModel.find().populate('class');
        return res.status(200).json({
            status: 'success',
            data: teachers,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching teachers',
        });
    }
};



export const getTeacherById = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await TeacherModel.findById(teacherId).populate('classes');

        if (!teacher) {
            return res.status(404).json({
                status: 'fail',
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: teacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching teacher',
        });
    }
};


export const updateTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const updates = req.body;

        const updatedTeacher = await TeacherModel.findByIdAndUpdate(teacherId, updates, { new: true, runValidators: true });

        if (!updatedTeacher) {
            return res.status(404).json({
                status: 'fail',
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Teacher updated successfully',
            data: updatedTeacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while updating teacher',
        });
    }
};


export const deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;

        const deletedTeacher = await TeacherModel.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {
            return res.status(404).json({
                status: 'fail',
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Teacher deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while deleting teacher',
        });
    }
};
