import express from "express";
import {SchoolHeadCreateAccount , loginSchoolHead} from '../controllers/Login.js';
const SchoolHeadRoutes = express.Router();
import {ConnectionToSpecificDatabase} from '../middleware/middleware.js'; 

SchoolHeadRoutes.route('/signup')
.post(ConnectionToSpecificDatabase,SchoolHeadCreateAccount);

SchoolHeadRoutes.route('/login')
.post(ConnectionToSpecificDatabase,loginSchoolHead);

export default SchoolHeadRoutes;