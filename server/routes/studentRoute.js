import express from 'express';
import { addStudent, getStudents, getStudentById, addStudentExam, deleteStudent } from '../controllers/studentController.js';
import ConnectionToSpecificDatabase from '../middleware/middleware.js';

const studentRoutes = express.Router();

studentRoutes.route('/students')
.post(ConnectionToSpecificDatabase,addStudent)
.get(ConnectionToSpecificDatabase, getStudents);

studentRoutes.route('/students/:id')
.get(ConnectionToSpecificDatabase, getStudentById)
.post(ConnectionToSpecificDatabase, addStudentExam)
.delete(ConnectionToSpecificDatabase, deleteStudent);


export default studentRoutes;