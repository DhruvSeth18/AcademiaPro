import StudentModel from "../models/studentModel.js";
import ClassModel from "../models/ClassModel.js";


export const addStudent = async (req, res) => {
    try {
        const { name, rollNumber, email, classId, performance } = req.body;
        const schoolCode = req.headers.code;
        if (!name || !rollNumber || !classId || !schoolCode) {
            return res.status(400).json({
                status: 'fail',
                message: 'All Fields are Required',
            });
        }
        const existingStudent = await StudentModel.findOne({ rollNumber });
        if (existingStudent) {
            return res.status(400).json({
                status: 'fail',
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
        const classData = await ClassModel.findById(classId);
        const stuId = newStudent._id;
        console.log(classData,stuId);
        if (!classData || !stuId) {
            return res.status(404).json({
                status: "fail",
                message: "Class or Student not found",
            });
        }
        console.log("Student Id is ",classData);
        classData.students.push(stuId);
        console.log(classData);
        await classData.save();
        await newStudent.save();
        return res.status(201).json({
            status: 'success',
            message: 'Student added successfully',
            data: newStudent,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while adding student',
        });
    }
};


export const getStudents = async (req, res) => {
    try {
        const {clas , classSection} = req.query;
        const students = await ClassModel.findOne({className:clas,sectionName:classSection}).populate('students');
        if(!students){
            return res.status(400).json({
                status:"fail",
                message:"Failed to retrieve everything"
            })
        }
        return res.status(200).json({
            status: 'success',
            data: students,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching students',
        });
    }
};

export const getStudentById = async (req, res) => {
    try {
        const studentId = req.params.id;
        const student = await StudentModel.findById(studentId).populate('class');

        if (!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'Student not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: student,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching student',
        });
    }
};



export const addStudentExam = async (req, res) => {
    try {
        const studentId = req.params.id;
        const newExam = req.body;

        const student = await StudentModel.findById(studentId);

        if (!student) {
            return res.status(404).json({
                status: 'fail',
                message: 'Student not found',
            });
        }

        student.performance.exams.push(newExam);

        // Save the updated student document
        await student.save();

        return res.status(200).json({
            status: 'success',
            message: 'Exam added successfully',
            data: student,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while adding exam',
        });
    }
};

export const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        const deletedStudent = await StudentModel.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({
                status: 'fail',
                message: 'Student not found',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Student deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while deleting student',
        });
    }
};
