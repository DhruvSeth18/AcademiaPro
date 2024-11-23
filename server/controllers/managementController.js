import ManagementModel from "../models/managementModel.js";

export const addManagement = async (req,res)=>{
    try{
        const {name , email, password, role} = req.body;
        const SchoolId = req.headers.code;

        if(!email || !password || !name || !SchoolId){
            return res.status(400).json({
                status: false,
                message: 'All fields are required (email, password, name, position)',
            });
        }
        const db = req.db;
        const Management = await ManagementModel(db);
        const existingManagement = await Management.findOne({ email });
        if (existingManagement) {
            return res.status(400).json({
                status: false,
                message: 'Management person with this email already exists',
            });
        }
        const newManagement = new ManagementModel({
            name:name,
            schoolCode:SchoolId,
            email:email,
            password: password,
            position:role,
        });
        await newManagement.save(); 
        return res.status(201).json({
            status: true,
            message: 'Management person added successfully',
        });
    } catch(error){
        console.log(error.message);
        res.status(500).json({
            status:false,
            message:"Error while Adding Management Person",
        })
    }
}


export const removeManagement = async (req, res) => {
    try {
        const managementId = req.params.managementId;
        if (!managementId) {
            return res.status(400).json({
                status: false,
                message: 'Management ID is required',
            });
        }
        const db = req.db;
        const Management = await ManagementModel(db);
        const management = await Management.findByIdAndDelete(managementId);
        if (!management) {
            return res.status(404).json({
                status: false,
                message: 'Management person not found',
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Management person removed successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while removing management person',
        });
    }
};


export const updateManagement = async (req, res) => {
    try {
        const managementId = req.params.managementId;
        const updates = req.body;

        if (!managementId) {
            return res.status(400).json({
                status: false,
                message: 'Management ID is required',
            });
        }

        if (!Object.keys(updates).length) {
            return res.status(400).json({
                status: false,
                message: 'At least one field is required to update',
            });
        }
        const db = req.db;
        const Management = await ManagementModel(db);
        const updatedManagement = await Management.findByIdAndUpdate(
            managementId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedManagement) {
            return res.status(404).json({
                status: false,
                message: 'Management person not found',
            });
        }

        return res.status(200).json({
            status: true,
            message: 'Management person updated successfully',
            data: updatedManagement,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while updating management person',
        });
    }
};


export const getManager = async (req, res) => {
    try {
        const db = req.db;
        const Management = await ManagementModel(db);
        const managers = await Management.find();
        if (managers.length === 0) {
            return res.status(404).json({
                status: false,
                message: 'No management persons found',
            });
        }
        return res.status(200).json({
            status: true,
            data: managers,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: false,
            message: 'Error while getting management persons',
        });
    }
};