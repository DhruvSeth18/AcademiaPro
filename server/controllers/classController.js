import ClassModel from "../models/ClassModel.js";
import StudentModel from "../models/studentModel.js";
import TeacherModel from "../models/teacherModel.js";

// Create a new class

/**
 * @swagger
 * /class:
 *   post:
 *     summary: Create a new class
 *     tags: [Class]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the class
 *                 example: "Mathematics"
 *               section:
 *                 type: string
 *                 description: Section of the class
 *                 example: "A"
 *               schoolCode:
 *                 type: string
 *                 description: Unique code for the school
 *                 example: "SCH123"
 *     responses:
 *       201:
 *         description: Class created successfully
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
 *                   example: Class created successfully
 *                 class:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The unique identifier of the class
 *                       example: "60c72b2f9b1e8d2b2c8f4f3a"
 *                     name:
 *                       type: string
 *                       description: The name of the class
 *                       example: "Mathematics"
 *                     section:
 *                       type: string
 *                       description: The section of the class
 *                       example: "A"
 *                     schoolCode:
 *                       type: string
 *                       description: The unique code for the school
 *                       example: "SCH123"
 *       400:
 *         description: All fields are required
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
 *                   example: All fields are required
 *       500:
 *         description: Error while creating class
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
 *                   example: Error while creating class
 */


export const createClass = async (req, res) => {
    try {
        const { className } = req.body;
        const SchoolCode = req.headers.code;

        if (!className) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }

        const newClass = new ClassModel({
            className,
            schoolCode:SchoolCode,
        });

        await newClass.save();

        return res.status(201).json({
            status: "success",
            message: "Class created successfully",
            class: newClass,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while creating class",
        });
    }
};

// Add a student to a class

/**
 * @swagger
 * /class/add-student:
 *   post:
 *     summary: Add a student to a class
 *     tags: [Class]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *                 description: ID of the class
 *                 example: "60c72b2f9b1e8d2b2c8f4f3a"
 *               studentId:
 *                 type: string
 *                 description: ID of the student
 *                 example: "60c72b2f9b1e8d2b2c8f4f4b"
 *     responses:
 *       200:
 *         description: Student added to class successfully
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
 *                   example: Student added to class
 *       404:
 *         description: Class or Student not found
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
 *                   example: Class or Student not found
 *       500:
 *         description: Error while adding student to class
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
 *                   example: Error while adding student to class
 */


export const addStudentToClass = async (req, res) => {
    try {
        const { classId, studentId } = req.body;

        const classData = await ClassModel.findById(classId);
        const studentData = await StudentModel.findById(studentId);

        if (!classData || !studentData) {
            return res.status(404).json({
                status: "fail",
                message: "Class or Student not found",
            });
        }

        classData.students.push(studentData._id);
        await classData.save();

        studentData.class = classData._id;
        await studentData.save();

        return res.status(200).json({
            status: "success",
            message: "Student added to class",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while adding student to class",
        });
    }
};

// Add a teacher to a class

/**
 * @swagger
 * /class/add-teacher:
 *   post:
 *     summary: Add a teacher to a class
 *     tags: [Class]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *                 description: ID of the class
 *                 example: "60c72b2f9b1e8d2b2c8f4f3a"
 *               teacherId:
 *                 type: string
 *                 description: ID of the teacher
 *                 example: "60c72b2f9b1e8d2b2c8f4f4b"
 *     responses:
 *       200:
 *         description: Teacher added to class successfully
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
 *                   example: Teacher added to class
 *       404:
 *         description: Class or Teacher not found
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
 *                   example: Class or Teacher not found
 *       500:
 *         description: Error while adding teacher to class
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
 *                   example: Error while adding teacher to class
 */


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

// Get class details

/**
 * @swagger
 * /class/{classId}:
 *   get:
 *     summary: Get details of a specific class
 *     tags: [Class]
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class to retrieve
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *     responses:
 *       200:
 *         description: Class details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 class:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1e8d2b2c8f4f3a"
 *                     name:
 *                       type: string
 *                       example: "Class A"
 *                     section:
 *                       type: string
 *                       example: "Section 1"
 *                     schoolCode:
 *                       type: number
 *                       example: 123
 *                     students:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60c72b2f9b1e8d2b2c8f4f4b"
 *                           name:
 *                             type: string
 *                             example: "John Doe"
 *                           rollNumber:
 *                             type: number
 *                             example: 456
 *                           email:
 *                             type: string
 *                             example: "john.doe@example.com"
 *                           class:
 *                             type: string
 *                             example: "60c72b2f9b1e8d2b2c8f4f3a"
 *                           schoolCode:
 *                             type: number
 *                             example: 123
 *                           gender:
 *                             type: string
 *                             example: male
 *                           performance:
 *                             type: object
 *                             properties:
 *                               exams:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     subject:
 *                                       type: string
 *                                       example: "Mathematics"
 *                                     marks:
 *                                       type: number
 *                                       example: 85
 *                                     maxMarks:
 *                                       type: number
 *                                       example: 100
 *                                     date:
 *                                       type: string
 *                                       format: date
 *                                       example: "2024-09-01"
 *                               overAllGrade:
 *                                 type: string
 *                                 example: "A"
 *                               attendence:
 *                                 type: string
 *                                 example: "60c72b2f9b1e8d2b2c8f4f4c"
 *                     teachers:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                             example: "60c72b2f9b1e8d2b2c8f4f4d"
 *                           name:
 *                             type: string
 *                             example: "Jane Smith"
 *                           email:
 *                             type: string
 *                             example: "jane.smith@example.com"
 *                           subject:
 *                             type: string
 *                             example: "English"
 *                           schoolCode:
 *                             type: number
 *                             example: 123
 *                           classes:
 *                             type: array
 *                             items:
 *                               type: string
 *                               example: "60c72b2f9b1e8d2b2c8f4f3a"
 *       404:
 *         description: Class not found
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
 *                   example: Class not found
 *       500:
 *         description: Error while fetching class details
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
 *                   example: Error while fetching class details
 */


export const getClassDetails = async (req, res) => {
    try {
        const classId = req.params.classId;

        const classData = await ClassModel.findById(classId)
            .populate('students')
            .populate('teachers');

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

// Update class information

/**
 * @swagger
 * /class:
 *   put:
 *     summary: Update details of a class
 *     tags: [Class]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               classId:
 *                 type: string
 *                 description: ID of the class to be updated
 *                 example: "60c72b2f9b1e8d2b2c8f4f3a"
 *               name:
 *                 type: string
 *                 description: New name of the class
 *                 example: "Class B"
 *               section:
 *                 type: string
 *                 description: New section of the class
 *                 example: "Section 2"
 *     responses:
 *       200:
 *         description: Class updated successfully
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
 *                   example: Class updated successfully
 *                 class:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1e8d2b2c8f4f3a"
 *                     name:
 *                       type: string
 *                       example: "Class B"
 *                     section:
 *                       type: string
 *                       example: "Section 2"
 *                     schoolCode:
 *                       type: number
 *                       example: 123
 *       404:
 *         description: Class not found
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
 *                   example: Class not found
 *       500:
 *         description: Error while updating class
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
 *                   example: Error while updating class
 */


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

// Delete a class

/**
 * @swagger
 * /class/{classId}:
 *   delete:
 *     summary: Delete a class
 *     tags: [Class]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the class to be deleted
 *         example: "60c72b2f9b1e8d2b2c8f4f3a"
 *     responses:
 *       200:
 *         description: Class deleted successfully
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
 *                   example: Class deleted successfully
 *       404:
 *         description: Class not found
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
 *                   example: Class not found
 *       500:
 *         description: Error while deleting class
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
 *                   example: Error while deleting class
 */


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
