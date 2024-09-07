import express from 'express';
import { createClass, addStudentToClass, addTeacherToClass, getClassDetails, updateClass, deleteClass } from '../controllers/classController.js';
import { ConnectionToSpecificDatabase } from '../controllers/middleware.js';
const classRoutes = express.Router();

// Route to create a new class
classRoutes.route('/class')
.post(ConnectionToSpecificDatabase,createClass)
.put(ConnectionToSpecificDatabase,updateClass);

classRoutes.post('/class/addStudent',ConnectionToSpecificDatabase, addStudentToClass);

classRoutes.post('/class/addTeacher',ConnectionToSpecificDatabase, addTeacherToClass);


classRoutes.route('/class/:classId')
.get(ConnectionToSpecificDatabase,getClassDetails)
.delete(ConnectionToSpecificDatabase,deleteClass);

export default classRoutes;
