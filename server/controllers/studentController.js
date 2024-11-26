import StudentModel from "../models/studentModel.js";
import ClassModel from "../models/ClassModel.js";


export const addStudent = async (req, res) => {
    try {
        const { username, rollNumber, className,sectionName,password} = req.body;
        const schoolCode = req.schoolCode;
        if (!username || !rollNumber || !schoolCode || !className || !sectionName || !password) {
            return res.status(400).json({
                status: false,
                message: 'All Fields are Required',
            });
        }
        const db = req.db;
        const Class = await ClassModel(db);
        const Student = await StudentModel(db);
        const classData = await Class.findOne({className,sectionName});
        console.log(className,sectionName);

        if(!classData){
            return res.status(400).json({
                status:false,
                message:"Class name or Section not Exist"
            })
        }

        const existingStudent = await Student.findOne({ rollNumber });
        if (existingStudent) {
            return res.status(400).json({
                status: false,
                message: 'Student already exists with this roll number',
            });
        }

        const newStudent = new Student({
            username,
            rollNumber,
            class: classData._id,
            schoolCode,
            password
        });

        const stuId = newStudent._id;

        if (!stuId) {
            return res.status(404).json({
                status: false,
                message: "Student not found",
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
        const {className , sectionName} = req.query;
        const db = req.db;
        
        const Class = await ClassModel(db);
        const Student = await StudentModel(db);
        await db.model('student', Student.schema);
        const students = await Class.findOne({className,sectionName}).populate('students');
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
        const {subject,examName,marks,maxMarks} = req.body;
        if(!subject || !examName || !marks || !maxMarks){
            return res.status(400).json({
                status:false,
                message:"Exam Details are insufficient"
            })
        }
        const db = req.db;
        const Student = await StudentModel(db);
        const student = await Student.findById(studentId);

        if (!student) {
            return res.status(404).json({
                status: false,
                message: 'Student not found',
            });
        }
        const newExam = {subject,examName,marks,maxMarks};
        student.performance.exams.push(newExam);

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
