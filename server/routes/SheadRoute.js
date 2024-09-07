import express from "express";
import {SchoolHeadCreateAccount , loginSchoolHead} from '../controllers/SheadController.js';
const SchoolHeadRoutes = express.Router();
import {ConnectionToSpecificDatabase} from '../controllers/middleware.js'; 

SchoolHeadRoutes.route('/signup')
.post(ConnectionToSpecificDatabase,SchoolHeadCreateAccount);

SchoolHeadRoutes.route('/login')
.post(ConnectionToSpecificDatabase,loginSchoolHead);

export default SchoolHeadRoutes;