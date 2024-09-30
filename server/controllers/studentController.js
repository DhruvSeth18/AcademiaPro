import StudentModel from "../models/studentModel.js";
import ClassModel from "../models/ClassModel.js";
// Add a new student

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Add a new student
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               rollNumber:
 *                 type: string
 *                 example: "12345"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               classId:
 *                 type: string
 *                 example: "class123"
 *               schoolCode:
 *                 type: string
 *                 example: "SCH123"
 *               performance:
 *                 type: string
 *                 example: "Excellent"
 *     responses:
 *       201:
 *         description: Student added successfully
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
 *                   example: Student added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "605c72efb47d611b2f7d4b23"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     rollNumber:
 *                       type: string
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     class:
 *                       type: string
 *                       example: "class123"
 *                     schoolCode:
 *                       type: string
 *                       example: "SCH123"
 *                     performance:
 *                       type: string
 *                       example: "Excellent"
 *       400:
 *         description: Bad Request - Missing required fields or student already exists
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
 *                   example: All Fields are Required
 *       500:
 *         description: Server error - Error while adding student
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
 *                   example: Error while adding student
 */


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

// Get all students

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve a list of all students
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "605c72efb47d611b2f7d4b23"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       rollNumber:
 *                         type: string
 *                         example: "12345"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       class:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "605c72efb47d611b2f7d4b24"
 *                           name:
 *                             type: string
 *                             example: "Class A"
 *                           section:
 *                             type: string
 *                             example: "A"
 *                       schoolCode:
 *                         type: string
 *                         example: "SCH123"
 *                       performance:
 *                         type: string
 *                         example: "Excellent"
 *       500:
 *         description: Server error - Error while fetching students
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
 *                   example: Error while fetching students
 */


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

// Get a student by ID

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to retrieve
 *         schema:
 *           type: string
 *           example: "605c72efb47d611b2f7d4b23"
 *     responses:
 *       200:
 *         description: Successfully retrieved the student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "605c72efb47d611b2f7d4b23"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     rollNumber:
 *                       type: string
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     class:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "605c72efb47d611b2f7d4b24"
 *                         name:
 *                           type: string
 *                           example: "Class A"
 *                         section:
 *                           type: string
 *                           example: "A"
 *                     schoolCode:
 *                       type: string
 *                       example: "SCH123"
 *                     performance:
 *                       type: string
 *                       example: "Excellent"
 *       404:
 *         description: Student not found
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
 *                   example: Student not found
 *       500:
 *         description: Server error - Error while fetching student
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
 *                   example: Error while fetching student
 */


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

// Update a student by ID

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to update
 *         schema:
 *           type: string
 *           example: "605c72efb47d611b2f7d4b23"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               rollNumber:
 *                 type: string
 *                 example: "12345"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               class:
 *                 type: string
 *                 example: "605c72efb47d611b2f7d4b24"
 *               schoolCode:
 *                 type: string
 *                 example: "SCH123"
 *               performance:
 *                 type: string
 *                 example: "Excellent"
 *     responses:
 *       200:
 *         description: Successfully updated the student
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
 *                   example: Student updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "605c72efb47d611b2f7d4b23"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     rollNumber:
 *                       type: string
 *                       example: "12345"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     class:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "605c72efb47d611b2f7d4b24"
 *                         name:
 *                           type: string
 *                           example: "Class A"
 *                         section:
 *                           type: string
 *                           example: "A"
 *                     schoolCode:
 *                       type: string
 *                       example: "SCH123"
 *                     performance:
 *                       type: string
 *                       example: "Excellent"
 *       400:
 *         description: Bad request - At least one field is required to update
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
 *                   example: At least one field is required to update
 *       404:
 *         description: Student not found
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
 *                   example: Student not found
 *       500:
 *         description: Server error - Error while updating student
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
 *                   example: Error while updating student
 */


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
// Delete a student by ID

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags: [Student]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the student to delete
 *         schema:
 *           type: string
 *           example: "605c72efb47d611b2f7d4b23"
 *     responses:
 *       200:
 *         description: Successfully deleted the student
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
 *                   example: Student deleted successfully
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: f798][p\+[poi6u45y't;l122'
 *                 message:
 *                   type: string
 *                   example: Student not found
 *       500:
 *         description: Server error - Error while deleting student
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
 *                   example: Error while deleting student
 */


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

// export const getAllClassStudent = async (req,res)=>{
//     const {classId} = req.body;
//     const studentList = await StudentModel.find({class:classId})
// }