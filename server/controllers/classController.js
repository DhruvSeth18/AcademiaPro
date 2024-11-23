import ClassModel from "../models/ClassModel.js";
import StudentModel from "../models/studentModel.js";
import TeacherModel from "../models/teacherModel.js";


export const createClass = async (req, res) => {
    try {
        const { className, section } = req.body;
        const schoolCode = req.headers.code;
        if (!className || !schoolCode || !section) {
            return res.status(400).json({
                status: false,
                message: "className, schoolCode, and section are required",
            });
        }
        const db = req.db;
        const Class = await ClassModel(db);
        const findClass = await Class.findOne({$and:[
            {sectionName: section},
            {className:className}
        ]})

        if(findClass){
            return res.status(400).json({
                status:false,
                message:"Class ALready Created"
            })
        }
        // Creating a new class with a single section
        const newClass = new Class({
            className,
            schoolCode,
            sectionName: section, 
            students: []
        });

        await newClass.save();
        return res.status(201).json({
            status: true,
            message: "Class created successfully",
            class: newClass,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Error while creating class",
        });
    }
};


export const getAllClasses = async (req, res) => {
    try {
        const db = req.db;
        const Class = await ClassModel(db);
        const classes = await Class.find().distinct('className');
        return res.status(200).json({ 
            status: true, 
            data: classes 
        });
    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            message: 'Failed to fetch classes' 
        });
    }
};

export const getSectionsByClass = async (req, res) => {
    const { className } = req.params;
    try {
        const db = req.db;
        const Class = await ClassModel(db);
        const sections = await Class.find({ className }).distinct('sectionName');
        if (sections.length === 0) {
            return res.status(404).json({ 
                status: false, 
                message: 'No sections found for the specified class' 
            });
        }
        res.status(200).json({ 
            status: true, 
            data: sections 
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ 
            status: false, 
            message: 'Failed to fetch sections', error 
        });
    }
};







export const addTeacherToClass = async (req, res) => {
    try {
        const { classId, teacherId } = req.body;
        const db = req.db;
        const Class = await ClassModel(db);
        const Teacher = await TeacherModel(db);
        const classData = await Class.findById(classId);
        const teacherData = await Teacher.findById(teacherId);

        if (!classData || !teacherData) {
            return res.status(404).json({
                status: false,
                message: "Class or Teacher not found",
            });
        }

        classData.teachers.push(teacherData._id);
        await classData.save();

        teacherData.classes.push(classData._id);
        await teacherData.save();

        return res.status(200).json({
            status: true,
            message: "Teacher added to class",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: "Error while adding teacher to class",
        });
    }
};


export const getClassDetails = async (req, res) => {
    try {
        const classId = req.params.classId;
        const db = req.db;
        const Class = await ClassModel(db);
        const classData = await Class.findById(classId)
            .populate('students');

        if (!classData) {
            return res.status(404).json({
                status: false,
                message: "Class not found",
            });
        }

        return res.status(200).json({
            status: true,
            class: classData,
        });
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: "Error while fetching class details",
        });
    }
};


export const updateClass = async (req, res) => {
    try {
        const { classId, name, section } = req.body;
        const db = req.db;
        const Class = await ClassModel(db);
        const updatedClass = await Class.findByIdAndUpdate(
            classId,
            { name, section },
            { new: true }
        );

        if (!updatedClass) {
            return res.status(404).json({
                status: false,
                message: "Class not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Class updated successfully",
            class: updatedClass,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: "Error while updating class",
        });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const classId = req.params.classId;
        const db = req.db;
        const Class = await ClassModel(db);
        const deletedClass = await Class.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({
                status: false,
                message: "Class not found",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Class deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: "Error while deleting class",
        });
    }
};
