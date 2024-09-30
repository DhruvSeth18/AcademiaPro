import ClassModel from '../models/ClassModel.js';
import TeacherModel from '../models/teacherModel.js';
import bcrypt from 'bcrypt';


// Add a new teacher

/**
 * @swagger
 * /teachers:
 *   post:
 *     summary: Add a new teacher
 *     tags: [Teacher]
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
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *               subject:
 *                 type: string
 *                 example: "Mathematics"
 *               SchoolCode:
 *                 type: string
 *                 example: "SCH001"
 *     responses:
 *       201:
 *         description: Teacher created successfully
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
 *                   example: Teacher created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "605c72efb47d611b2f7d4b23"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     subject:
 *                       type: string
 *                       example: "Mathematics"
 *                     SchoolCode:
 *                       type: string
 *                       example: "SCH001"
 *       400:
 *         description: Bad request - All fields are required or teacher already exists
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
 *         description: Server error - Error while creating teacher
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
 *                   example: Error while creating teacher
 */


export const addTeacher = async (req, res) => {
    try {
        const { name, email, password, subject,classId} = req.body;
        const schoolCode = req.headers.code;
        // Validate request data
        if (!name || !email || !password || !subject || !schoolCode) {
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required',
            });
        }

        // Check if the teacher already exists
        const existingTeacher = await TeacherModel.findOne({ email });
        if (existingTeacher) {
            return res.status(400).json({
                status: 'fail',
                message: 'Teacher already exists with this email',
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new teacher
        const newTeacher = new TeacherModel({
            name,
            email,
            password: hashedPassword,
            class:classId,
            subject,
            schoolCode,
        });
        
        const classData = await ClassModel.findById(classId);
        console.log(newTeacher._id);
        classData.classTeacher = newTeacher._id;

        await classData.save();
        await newTeacher.save();

        return res.status(201).json({
            status: 'success',
            message: 'Teacher created successfully',
            data: newTeacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while creating teacher',
        });
    }
};

// Get all teachers

/**
 * @swagger
 * /teachers:
 *   get:
 *     summary: Get all teachers
 *     tags: [Teacher]
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of teachers
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
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       subject:
 *                         type: string
 *                         example: "Mathematics"
 *                       SchoolCode:
 *                         type: string
 *                         example: "SCH001"
 *                       classes:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["605c72efb47d611b2f7d4b24", "605c72efb47d611b2f7d4b25"]
 *       500:
 *         description: Server error - Error while fetching teachers
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
 *                   example: Error while fetching teachers
 */


export const getTeachers = async (req, res) => {
    try {
        const teachers = await TeacherModel.find().populate('classes');
        return res.status(200).json({
            status: 'success',
            data: teachers,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching teachers',
        });
    }
};

// Get a teacher by ID

/**
 * @swagger
 * /teachers/{id}:
 *   get:
 *     summary: Get a teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to retrieve
 *     responses:
 *       200:
 *         description: Successfully retrieved the teacher details
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
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     subject:
 *                       type: string
 *                       example: "Mathematics"
 *                     SchoolCode:
 *                       type: string
 *                       example: "SCH001"
 *                     classes:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["605c72efb47d611b2f7d4b24", "605c72efb47d611b2f7d4b25"]
 *       404:
 *         description: Teacher not found
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
 *                   example: Teacher not found
 *       500:
 *         description: Server error - Error while fetching teacher
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
 *                   example: Error while fetching teacher
 */


export const getTeacherById = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const teacher = await TeacherModel.findById(teacherId).populate('classes');

        if (!teacher) {
            return res.status(404).json({
                status: 'fail',
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            data: teacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while fetching teacher',
        });
    }
};

// Update a teacher by ID

/**
 * @swagger
 * /teachers/{id}:
 *   put:
 *     summary: Update a teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to update
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
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               subject:
 *                 type: string
 *                 example: "Mathematics"
 *               SchoolCode:
 *                 type: string
 *                 example: "SCH001"
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - SchoolCode
 *     responses:
 *       200:
 *         description: Successfully updated the teacher
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
 *                   example: Teacher updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "605c72efb47d611b2f7d4b23"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     subject:
 *                       type: string
 *                       example: "Mathematics"
 *                     SchoolCode:
 *                       type: string
 *                       example: "SCH001"
 *       400:
 *         description: Bad request due to invalid input
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
 *                   example: Invalid input data
 *       404:
 *         description: Teacher not found
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
 *                   example: Teacher not found
 *       500:
 *         description: Server error - Error while updating teacher
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
 *                   example: Error while updating teacher
 */


export const updateTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;
        const updates = req.body;

        const updatedTeacher = await TeacherModel.findByIdAndUpdate(teacherId, updates, { new: true, runValidators: true });

        if (!updatedTeacher) {
            return res.status(404).json({
                status: 'fail',
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Teacher updated successfully',
            data: updatedTeacher,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while updating teacher',
        });
    }
};

// Delete a teacher by ID

/**
 * @swagger
 * /teachers/{id}:
 *   delete:
 *     summary: Delete a teacher by ID
 *     tags: [Teacher]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the teacher to delete
 *     responses:
 *       200:
 *         description: Successfully deleted the teacher
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
 *                   example: Teacher deleted successfully
 *       404:
 *         description: Teacher not found
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
 *                   example: Teacher not found
 *       500:
 *         description: Server error - Error while deleting teacher
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
 *                   example: Error while deleting teacher
 */


export const deleteTeacher = async (req, res) => {
    try {
        const teacherId = req.params.id;

        const deletedTeacher = await TeacherModel.findByIdAndDelete(teacherId);

        if (!deletedTeacher) {
            return res.status(404).json({
                status: 'fail',
                message: 'Teacher not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Teacher deleted successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while deleting teacher',
        });
    }
};
