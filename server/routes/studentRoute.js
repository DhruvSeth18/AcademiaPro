import express from 'express';
import { addStudent, getStudents, getStudentById, addStudentExam, deleteStudent } from '../controllers/studentController.js';
import ConnectionToSpecificDatabase from '../middleware/middleware.js';
import headAccesss from '../middleware/headAccess.js';
import HeadManagementTeacher from '../middleware/HeadManagmentTeacher.js';
const studentRoutes = express.Router();

studentRoutes.route('/students')
.post(headAccesss,addStudent)
.get(headAccesss, getStudents);

studentRoutes.route('/students/:id')
.get(HeadManagementTeacher, getStudentById)
.post(HeadManagementTeacher, addStudentExam)
.delete(HeadManagementTeacher, deleteStudent);


export default studentRoutes;