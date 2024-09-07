import AttendanceModel from "../models/attendenceModel.js";
import StudentModel from "../models/studentModel.js";

/**
 * @swagger
 * /attendance:
 *   post:
 *     summary: Mark attendance for a student
 *     tags: [Attendance]
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
 *             required:
 *               - date
 *               - studentId
 *               - status
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *               studentId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [present, absent]
 *     responses:
 *       201:
 *         description: Attendance marked successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Error while marking attendance
 */

export const markAttendance = async (req, res) => {
    try {
        const { date, studentId, status, schoolCode } = req.body;

        if (!date || !studentId || !status || !schoolCode) {
            return res.status(400).json({
                status: "fail",
                message: "All fields are required",
            });
        }

        const studentData = await StudentModel.findById(studentId);

        if (!studentData) {
            return res.status(404).json({
                status: "fail",
                message: "Student not found",
            });
        }

        // Check if attendance is already marked for this student on the same date
        const existingAttendance = await AttendanceModel.findOne({
            student: studentId,
            date: date,
        });

        if (existingAttendance) {
            return res.status(400).json({
                status: "fail",
                marked:true,
                message: "Attendance already marked for this date",
            });
        }

        // If not marked, create a new attendance record
        const newAttendance = new AttendanceModel({
            date,
            student: studentId,
            status,
            schoolCode,
        });

        await newAttendance.save();

        return res.status(201).json({
            status: "success",
            marked:false,
            message: "Attendance marked successfully",
            attendance: newAttendance,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while marking attendance",
        });
    }
};

// Update Attendance
/**
 * @swagger
 * /attendance:
 *   put:
 *     summary: Update attendance for a student
 *     tags: [Attendance]
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
 *             required:
 *               - attendanceId
 *               - status
 *             properties:
 *               attendanceId:
 *                 type: string
 *                 description: The ID of the attendance record to update
 *               status:
 *                 type: string
 *                 enum: [present, absent]
 *                 description: The updated status of the attendance record
 *     responses:
 *       200:
 *         description: Attendance updated successfully
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
 *                   example: Attendance updated successfully
 *                 attendance:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: The ID of the updated attendance record
 *                     date:
 *                       type: string
 *                       format: date
 *                       description: The date of the attendance record
 *                     student:
 *                       type: string
 *                       description: The ID of the student
 *                     status:
 *                       type: string
 *                       enum: [present, absent]
 *                       description: The updated status of the attendance record
 *                     schoolCode:
 *                       type: string
 *                       description: The school code
 *       400:
 *         description: Bad request
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
 *                   example: Attendance ID and status are required
 *       404:
 *         description: Attendance record not found
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
 *                   example: Attendance record not found
 *       500:
 *         description: Error while updating attendance
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
 *                   example: Error while updating attendance
 */


export const updateAttendance = async (req, res) => {
    try {
        const { attendanceId, status } = req.body;

        if (!attendanceId || !status) {
            return res.status(400).json({
                status: "fail",
                message: "Attendance ID and status are required",
            });
        }

        const updatedAttendance = await AttendanceModel.findByIdAndUpdate(
            attendanceId,
            { status },
            { new: true }
        );

        if (!updatedAttendance) {
            return res.status(404).json({
                status: "fail",
                message: "Attendance record not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Attendance updated successfully",
            attendance: updatedAttendance,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while updating attendance",
        });
    }
};

// Get Attendance Records

/**
 * @swagger
 * /attendance:
 *   get:
 *     summary: Get attendance records for a student in a specific month and year
 *     tags: [Attendance]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *       - in: query
 *         name: studentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the student whose attendance records are to be fetched
 *       - in: query
 *         name: month
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The month for which attendance records are required (1-12)
 *       - in: query
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *           format: int32
 *         description: The year for which attendance records are required
 *     responses:
 *       200:
 *         description: Successfully fetched attendance records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 attendance:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         description: The ID of the attendance record
 *                       date:
 *                         type: string
 *                         format: date
 *                         description: The date of the attendance record
 *                       student:
 *                         type: string
 *                         description: The ID of the student
 *                       status:
 *                         type: string
 *                         enum: [present, absent]
 *                         description: The status of the attendance record
 *                       schoolCode:
 *                         type: string
 *                         description: The school code
 *       400:
 *         description: Bad request if any required query parameters are missing
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
 *                   example: Student ID, month, and year are required
 *       500:
 *         description: Error while fetching attendance records
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
 *                   example: Error while fetching attendance records
 */


export const getAttendanceRecords = async (req, res) => {
    try {
        const { studentId, month, year } = req.query;

        if (!studentId || !month || !year) {
            return res.status(400).json({
                status: "fail",
                message: "Student ID, month, and year are required",
            });
        }

        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);

        const attendanceRecords = await AttendanceModel.find({
            student: studentId,
            date: { $gte: startDate, $lte: endDate },
        });

        return res.status(200).json({
            status: "success",
            attendance: attendanceRecords,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while fetching attendance records",
        });
    }
};


// Delete Attendance Record

/**
 * @swagger
 * /attendance/{attendanceId}:
 *   delete:
 *     summary: Delete an attendance record
 *     tags: [Attendance]
 *     parameters:
 *       - in: header
 *         name: school-code
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique code for the school
 *       - in: path
 *         name: attendanceId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the attendance record to be deleted
 *     responses:
 *       200:
 *         description: Successfully deleted the attendance record
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
 *                   example: Attendance record deleted successfully
 *       404:
 *         description: Attendance record not found
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
 *                   example: Attendance record not found
 *       500:
 *         description: Error while deleting attendance record
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
 *                   example: Error while deleting attendance record
 */

export const deleteAttendanceRecord = async (req, res) => {
    try {
        const { attendanceId } = req.params;

        const deletedAttendance = await AttendanceModel.findByIdAndDelete(attendanceId);

        if (!deletedAttendance) {
            return res.status(404).json({
                status: "fail",
                message: "Attendance record not found",
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Attendance record deleted successfully",
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: "fail",
            message: "Error while deleting attendance record",
        });
    }
};
