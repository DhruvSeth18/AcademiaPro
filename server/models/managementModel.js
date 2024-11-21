import mongoose from "mongoose";
const managementSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    schoolCode:{
        type:Number,
        required:true
    },
    role: { 
        type: String, 
        enum: ['Principal', 'Vice Principal','Management'], 
        required: true ,
        default:"Management"
    },
});
const ManagementModel = (db)=> db.model('management',managementSchema);
export default ManagementModel;