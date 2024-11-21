import ClassModel from "../models/ClassModel.js";
import StudentModel from "../models/studentModel.js";
import TeacherModel from "../models/teacherModel.js";


export const createClass = async (req, res) => {
    try {
        const { className, section } = req.body; // Extract className and single section from the body
        const schoolCode = req.headers.code; // SchoolCode from the headers

        // Basic validation
        if (!className || !schoolCode || !section) {
            return res.status(400).json({
                status: "fail",
                message: "className, schoolCode, and section are required",
            });
        }
        const findClass = await ClassModel.findOne({$or:[
            {sectionName: section},
            {className:className}
        ]})
        if(findClass){
            return res.status(400).json({
                status:"fail",
                message:"Class ALready Created"
            })
        }
        // Creating a new class with a single section
        const newClass = new ClassModel({
            className,
            schoolCode,
            sectionName: section, 
            students: [] // Initialize with an empty array for students
        });
        // Save the new class in the database
        await newClass.save();
        return res.status(201).json({
            status: "success",
            message: "Class created successfully",
            class: newClass,
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while creating class",
        });
    }
};


export const getClasses = async (req, res) => {
    try {
        const Classes = await ClassModel.find();
        return res.status(200).json({
            status: 'success',
            data: Classes,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching teachers',
        });
    }
};


export const addTeacherToClass = async (req, res) => {
    try {
        const { classId, teacherId } = req.body;

        const classData = await ClassModel.findById(classId);
        const teacherData = await TeacherModel.findById(teacherId);

        if (!classData || !teacherData) {
            return res.status(404).json({
                status: "fail",
                message: "Class or Teacher not found",
            });
        }

        classData.teachers.push(teacherData._id);
        await classData.save();

        teacherData.classes.push(classData._id);
        await teacherData.save();

        return res.status(200).json({
            status: "success",
            message: "Teacher added to class",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while adding teacher to class",
        });
    }
};


export const getClassDetails = async (req, res) => {
    try {
        const classId = req.params.classId;

        const classData = await ClassModel.findById(classId)
            .populate('students');

        if (!classData) {
            return res.status(404).json({
                status: "fail",
                message: "Class not found",
            });
        }

        return res.status(200).json({
            status: "success",
            class: classData,
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while fetching class details",
        });
    }
};


export const updateClass = async (req, res) => {
    try {
        const { classId, name, section } = req.body;

        const updatedClass = await ClassModel.findByIdAndUpdate(
            classId,
            { name, section },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({
                status: "fail",
                message: "Class not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Class updated successfully",
            class: updatedClass,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while updating class",
        });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const classId = req.params.classId;

        const deletedClass = await ClassModel.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({
                status: "fail",
                message: "Class not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Class deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while deleting class",
        });
    }
};
