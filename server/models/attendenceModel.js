import mongoose from "mongoose";

const attendenceSchema =new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'student',
        required:true,
    },
    date: { 
        type: Date, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['Present', 'Absent'], 
        required: true,
        default:'Absent'
    },
    schoolCode: { 
        type: String, 
        required: true 
    },
})
const AttendenceModel = mongoose.model('attendence',attendenceSchema);
export default AttendenceModel;