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
                status: false,
                message: 'All fields are required',
            });
        }

        // Check if the teacher already exists
        const db = req.db;
        const Teacher = await TeacherModel(db);
        const existingTeacher = await Teacher.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                status: false,
                message: 'Teacher already exists with this email',
            });
        }
        // Create a new teacher
        const newTeacher = new Teacher({
            name,
            email,
            password,
            class:classId,
            subject,
            schoolCode,
        });
        const Class = await ClassModel(db);
        const classData = await Class.findById(classId);
        console.log(newTeacher._id);
        classData.classTeacher = newTeacher._id;

        await classData.save();
        await newTeacher.save();

        return res.status(201).json({
            status: true,
            message: 'Teacher created successfully',
            data: newTeacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while creating teacher',
        });
    }
};


export const getTeachers = async (req, res) => {
    try {
        const db = req.db;
        const Teacher = TeacherModel(db);
        const teachers = await Teacher.find().populate('class');
        return res.status(200).json({
            status: true,
            data: teachers,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while fetching teachers',
        });
    }
};



export const getTeacherById = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const db = req.db;
        const Teacher = await TeacherModel(db);
        const teacher = await Teacher.findById(teacherId).populate('classes');

        if (!teacher) {
            return res.status(404).json({
                status: false,
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: true,
            data: teacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while fetching teacher',
        });
    }
};


export const updateTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const updates = req.body;
        const db = req.db;
        const Teacher = await TeacherModel(db);
        const updatedTeacher = await Teacher.findByIdAndUpdate(teacherId, updates, { new: true, runValidators: true });

        if (!updatedTeacher) {
            return res.status(404).json({
                status: false,
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Teacher updated successfully',
            data: updatedTeacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while updating teacher',
        });
    }
};


export const deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const db = req.db;
        const Teacher = await TeacherModel(db);
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {
            return res.status(404).json({
                status: false,
                message: 'Teacher not found',
            });
        }
        
        return res.status(200).json({
            status: true,
            message: 'Teacher deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while deleting teacher',
        });
    }
};
