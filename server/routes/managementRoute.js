import express from "express";
const managementRoutes = express.Router();
import { addManagement,updateManagement,removeManagement,getManager} from "../controllers/managementController.js";
import {ConnectionToSpecificDatabase} from '../middleware/middleware.js'; 

managementRoutes.route('/management')
.post(ConnectionToSpecificDatabase,addManagement)
.get(ConnectionToSpecificDatabase,getManager),

managementRoutes.route('/management/:managementId')
.put(ConnectionToSpecificDatabase,updateManagement)
.delete(ConnectionToSpecificDatabase,removeManagement);


export default managementRoutes; 