import express from 'express';

import { checkAttendanceToday, markAttendance, getMonthlyAttendance, getYearlyAttendance } from '../controllers/attendenceController.js';
import ConnectionToSpecificDatabase from '../middleware/middleware.js';
const attendenceRoutes = express.Router();

// Check today's attendance for a student
attendenceRoutes.route('/attendance')
.get(ConnectionToSpecificDatabase,checkAttendanceToday)
.post(ConnectionToSpecificDatabase,markAttendance);

attendenceRoutes.get('/attandance/monthly',getMonthlyAttendance);

attendenceRoutes.get('/attandance/yearly',getYearlyAttendance);


export default attendenceRoutes;
