import express from "express";
const managementRoutes = express.Router();
import { addManagement,updateManagement,removeManagement,getManager} from "../controllers/managementController.js";
import ConnectionToSpecificDatabase from '../middleware/middleware.js'; 
import headAccesss from "../middleware/headAccess.js";

managementRoutes.route('/management')
.post(headAccesss,addManagement)
.get(headAccesss,getManager);

managementRoutes.route('/management/:managementId')
.put(ConnectionToSpecificDatabase,updateManagement)
.delete(ConnectionToSpecificDatabase,removeManagement);


export default managementRoutes; 