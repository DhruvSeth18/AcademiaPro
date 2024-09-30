import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
    className: { 
        type: String, 
        required: true 
    },
    classTeacher: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'teacher'
    },
    schoolCode: { 
        type: Number, 
        required: true 
    },
    sectionName: {
        type: String,
        enum: ['A', 'B', 'C', 'D', 'E'],
        required: true
    },
    students: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'student'
    }]
});


const ClassModel = mongoose.model('class', classSchema);
export default ClassModel;