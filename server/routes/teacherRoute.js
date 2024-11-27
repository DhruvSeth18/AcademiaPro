import express from 'express';
import { addTeacher, getTeachers, getTeacherById, updateTeacher, deleteTeacher } from '../controllers/teacherController.js';
import ConnectionToSpecificDatabase from '../middleware/middleware.js';
import headAccesss from '../middleware/headAccess.js';

const teacherRoutes = express.Router();
teacherRoutes.route('/teachers')
.post(headAccesss,addTeacher)
.get(headAccesss,getTeachers);

teacherRoutes.route('/teacher/:id')
.get(ConnectionToSpecificDatabase,getTeacherById)
.put(headAccesss,updateTeacher)
.delete(headAccesss,deleteTeacher);

export default teacherRoutes;
