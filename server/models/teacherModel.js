import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    subject:{
        type:String,
        required:true
    },
    schoolCode:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"Teacher"
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    }
})

const TeacherModel = mongoose.model('teacher',teacherSchema);

export default TeacherModel;