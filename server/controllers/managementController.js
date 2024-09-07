import ManagementModel from "../models/managementModel.js";

/**
 * @swagger
 * /management:
 *   post:
 *     summary: Add a new management person
 *     tags: [Management]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the management person
 *                 example: "management@example.com"
 *               password:
 *                 type: string
 *                 description: Password for the management person
 *                 example: "securepassword123"
 *               role:
 *                 type: string
 *                 description: Role of the management person
 *                 example: "Principal"
 *     responses:
 *       201:
 *         description: Management person added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Management person added successfully
 *       400:
 *         description: Bad request - Missing fields or management person already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: All fields are required (email, password, role) or Management person with this email already exists
 *       500:
 *         description: Server error - Error while adding management person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error while Adding Management Person
 */


export const addManagement = async (req,res)=>{
    try{
        const {name , email, password, role} = req.body;
        const SchoolId = req.headers.code;

        if(!email || !password || !name || !SchoolId){
            return res.status(400).json({
                status: 'fail',
                message: 'All fields are required (email, password, name, position)',
            });
        }
        const existingManagement = await ManagementModel.findOne({ email });
        if (existingManagement) {
            return res.status(400).json({
                status: 'fail',
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
            status: 'success',
            message: 'Management person added successfully',
        });
    } catch(error){
        console.log(error.message);
        res.status(500).json({
            status:'fail',
            message:"Error while Adding Management Person",
        })
    }
}


/**
 * @swagger
 * /management/{managementId}:
 *   delete:
 *     summary: Remove a management person
 *     tags: [Management]
 *     parameters:
 *       - in: path
 *         name: managementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the management person to remove
 *         example: "60d5f4802c4e8d001f9e2b6c"
 *     responses:
 *       200:
 *         description: Management person removed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Management person removed successfully
 *       400:
 *         description: Bad request - Management ID is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Management ID is required
 *       404:
 *         description: Not found - Management person not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Management person not found
 *       500:
 *         description: Server error - Error while removing management person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error while removing management person
 */


export const removeManagement = async (req, res) => {
    try {
        const managementId = req.params.managementId;
        if (!managementId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Management ID is required',
            });
        }
        const management = await ManagementModel.findByIdAndDelete(managementId);
        if (!management) {
            return res.status(404).json({
                status: 'fail',
                message: 'Management person not found',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Management person removed successfully',
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while removing management person',
        });
    }
};


/**
 * @swagger
 * /management/{managementId}:
 *   put:
 *     summary: Update a management person's details
 *     tags: [Management]
 *     parameters:
 *       - in: path
 *         name: managementId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the management person to update
 *         example: "60d5f4802c4e8d001f9e2b6c"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "newpassword123"
 *               position:
 *                 type: string
 *                 example: "Manager"
 *             additionalProperties: true
 *     responses:
 *       200:
 *         description: Management person updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 message:
 *                   type: string
 *                   example: Management person updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60d5f4802c4e8d001f9e2b6c"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "johndoe@example.com"
 *                     position:
 *                       type: string
 *                       example: "Manager"
 *       400:
 *         description: Bad request - Management ID is required or no fields provided for update
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Management ID is required or at least one field is required to update
 *       404:
 *         description: Not found - Management person not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Management person not found
 *       500:
 *         description: Server error - Error while updating management person
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error while updating management person
 */

export const updateManagement = async (req, res) => {
    try {
        const managementId = req.params.managementId;
        const updates = req.body;

        if (!managementId) {
            return res.status(400).json({
                status: 'fail',
                message: 'Management ID is required',
            });
        }

        if (!Object.keys(updates).length) {
            return res.status(400).json({
                status: 'fail',
                message: 'At least one field is required to update',
            });
        }

        const updatedManagement = await ManagementModel.findByIdAndUpdate(
            managementId,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedManagement) {
            return res.status(404).json({
                status: 'fail',
                message: 'Management person not found',
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Management person updated successfully',
            data: updatedManagement,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while updating management person',
        });
    }
};


/**
 * @swagger
 * /management:
 *   get:
 *     summary: Get a list of all management persons
 *     tags: [Management]
 *     responses:
 *       200:
 *         description: Successfully retrieved list of management persons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60d5f4802c4e8d001f9e2b6c"
 *                       name:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "johndoe@example.com"
 *                       position:
 *                         type: string
 *                         example: "Manager"
 *       404:
 *         description: No management persons found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: No management persons found
 *       500:
 *         description: Server error - Error while retrieving management persons
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: Error while getting management persons
 */


export const getManager = async (req, res) => {
    try {
        const managers = await ManagementModel.find();
        if (managers.length === 0) {
            return res.status(404).json({
                status: 'fail',
                message: 'No management persons found',
            });
        }
        return res.status(200).json({
            status: 'success',
            data: managers,
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            status: 'fail',
            message: 'Error while getting management persons',
        });
    }
};