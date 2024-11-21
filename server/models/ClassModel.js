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


const ClassModel =(db)=> db.model('class', classSchema);
export default ClassModel;