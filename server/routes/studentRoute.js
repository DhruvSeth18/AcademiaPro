import express from 'express';
import { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } from '../controllers/studentController.js';
import { ConnectionToSpecificDatabase } from '../controllers/middleware.js';

const studentRoutes = express.Router();

studentRoutes.route('/students')
.post(ConnectionToSpecificDatabase,addStudent)
.get(ConnectionToSpecificDatabase, getStudents);


studentRoutes.route('/students/:id')
.get(ConnectionToSpecificDatabase, getStudentById)
.put(ConnectionToSpecificDatabase, updateStudent)
.delete(ConnectionToSpecificDatabase, deleteStudent);


export default studentRoutes;