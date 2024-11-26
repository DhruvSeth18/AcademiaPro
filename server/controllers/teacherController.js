import ClassModel from '../models/ClassModel.js';
import TeacherModel from '../models/teacherModel.js';

export const addTeacher = async (req, res) => {
    try {
        const { username, email, password, subject, className, sectionName } = req.body;
        const schoolCode = req.headers.code;

        // Validate request data
        if (!username || !email || !password || !subject || !className || !sectionName || !schoolCode) {
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

        // Find the class by className and sectionName
        const Class = await ClassModel(db);
        const classData = await Class.findOne({ className, sectionName, schoolCode });

        if (!classData) {
            return res.status(404).json({
                status: false,
                message: 'Class not found for the given className and sectionName',
            });
        }

        // Create a new teacher
        const newTeacher = new Teacher({
            username,
            email,
            password,
            subject,
            schoolCode,
        });

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
        const Class = ClassModel(db);
        await db.model('class', Class.schema);
        const teachers = await Teacher.find().populate('class');

        return res.status(200).json({
            status: true,
            data: teachers,
        });
    } catch (error) {
        console.error(error.message);
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
        const Class = await ClassModel(db);
        const Teacher = await TeacherModel(db);

        // Validate required fields for class details
        const { className, sectionName } = updates;
        if (!className || !sectionName) {
            return res.status(400).json({
                status: false,
                message: "className and sectionName are required",
            });
        }

        // Check if the provided class and section exist in the database
        const checkClass = await Class.findOne({ className, sectionName });
        if (!checkClass) {
            return res.status(400).json({
                status: false,
                message: "Class details are invalid",
            });
        }

        // Assign the valid class ID to the teacher's update object
        updates.class = checkClass._id;
        // checkClass.classTeacher

        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            updates,
            { new: true, runValidators: true }
        );

        // Handle the case where the teacher is not found
        if (!updatedTeacher) {
            return res.status(404).json({
                status: false,
                message: "Teacher not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Teacher updated successfully",
            data: updatedTeacher,
        });
    } catch (error) {
        console.error("Error while updating teacher:", error.message);
        return res.status(500).json({
            status: false,
            message: "Internal server error while updating teacher",
            error: error.message,
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
