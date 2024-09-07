import express from 'express';
import { markAttendance, updateAttendance, getAttendanceRecords, deleteAttendanceRecord } from '../controllers/attendenceController.js';
import { ConnectionToSpecificDatabase } from '../controllers/middleware.js';
const attendenceRoutes = express.Router();

// Route to mark attendance
attendenceRoutes.route('/attendence')
.post(ConnectionToSpecificDatabase,markAttendance)
.put(ConnectionToSpecificDatabase,updateAttendance)
.get(ConnectionToSpecificDatabase,getAttendanceRecords);

// Route to delete an attendance record
attendenceRoutes.delete('/attendance/:attendanceId', ConnectionToSpecificDatabase, deleteAttendanceRecord);

export default attendenceRoutes;
