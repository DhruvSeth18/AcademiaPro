import express from 'express';
import { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';
import { ConnectionToSpecificDatabase } from '../controllers/middleware.js';
const teacherRoutes = express.Router();

teacherRoutes.route('/teachers')
.post(ConnectionToSpecificDatabase,addTeacher)
.get(ConnectionToSpecificDatabase,getTeachers);


teacherRoutes.route('/teachers/:id')
.get(ConnectionToSpecificDatabase,getTeacherById)
.post(ConnectionToSpecificDatabase,updateTeacher)
.delete(ConnectionToSpecificDatabase,deleteTeacher);

export default teacherRoutes;
