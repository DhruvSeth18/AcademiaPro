import StudentModel from "../models/studentModel.js";

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
        const { name, rollNumber, email, classId, schoolCode, performance } = req.body;

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
        const students = await StudentModel.find().populate('class');
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


export const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const updates = req.body;

        const updatedStudent = await StudentModel.findByIdAndUpdate(studentId, updates, { new: true, runValidators: true });

        if (!updatedStudent) {
            return res.status(404).json({
                status: 'fail',
                message: 'Student not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Student updated successfully',
            data: updatedStudent,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while updating student',
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
 *                   example: f798][p\+oyiutrqewwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww234567899999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999[poi6u45y
 't;l122
 ail
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
