import StudentModel from "../models/studentModel.js";
import ClassModel from "../models/ClassModel.js";


export const addStudent = async (req, res) => {
    try {
        const { name, rollNumber, email, classId, performance } = req.body;
        const schoolCode = req.headers.code;
        if (!name || !rollNumber || !classId || !schoolCode) {
            return res.status(400).json({
                status: false,
                message: 'All Fields are Required',
            });
        }
        const db = req.db;
        const Student = await StudentModel(db);
        const existingStudent = await Student.findOne({ rollNumber });
        if (existingStudent) {
            return res.status(400).json({
                status: false,
                message: 'Student already exists with this roll number',
            });
        }

        const newStudent = new StudentModel({
            name,
            rollNumber,
            email,
            class: classId,
            schoolCode,
            performance,
        });
        // Save the student to the database
        const Class = await ClassModel(db);
        const classData = await Class.findById(classId);
        const stuId = newStudent._id;
        console.log(classData,stuId);
        if (!classData || !stuId) {
            return res.status(404).json({
                status: false,
                message: "Class or Student not found",
            });
        }
        console.log("Student Id is ",classData);
        classData.students.push(stuId);
        console.log(classData);
        await classData.save();
        await newStudent.save();
        return res.status(201).json({
            status: true,
            message: 'Student added successfully',
            data: newStudent,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while adding student',
        });
    }
};


export const getStudents = async (req, res) => {
    try {
        const {clas , classSection} = req.query;
        const db = req.db;
        const Class = await ClassModel(db);
        const students = await Class.findOne({className:clas,sectionName:classSection}).populate('students');
        if(!students){
            return res.status(400).json({
                status:false,
                message:"Failed to retrieve everything"
            })
        }
        return res.status(200).json({
            status: true,
            data: students,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while fetching students',
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const db = req.db;
        const Student = await StudentModel(db);
        const student = await Student.findById(studentId).populate('class');

        if (!student) {
            return res.status(404).json({
                status: false,
                message: 'Student not found',
            });
        }

        return res.status(200).json({
            status: true,
            data: student,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while fetching student',
        });
    }
};



export const addStudentExam = async (req, res) => {
    try {
        const studentId = req.params.id;
        const newExam = req.body;
        const db = req.db;
        const Student = await StudentModel(db);
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                status: false,
                message: 'Student not found',
            });
        }

        student.performance.exams.push(newExam);

        // Save the updated student document
        await student.save();

        return res.status(200).json({
            status: true,
            message: 'Exam added successfully',
            data: student,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while adding exam',
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const db = req.db;
        const Student = await StudentModel(db);
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({
                status: false,
                message: 'Student not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Student deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while deleting student',
        });
    }
};
