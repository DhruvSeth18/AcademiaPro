import express from "express";
const managementRoutes = express.Router();
import { addManagement,updateManagement,removeManagement,getManager} from "../controllers/managementController.js";

import headAccesss from "../middleware/headAccess.js";

managementRoutes.route('/management')
.post(headAccesss,addManagement)
.get(headAccesss,getManager);

managementRoutes.route('/management/:managementId')
.put(headAccesss,updateManagement)
.delete(headAccesss,removeManagement);


export default managementRoutes; 