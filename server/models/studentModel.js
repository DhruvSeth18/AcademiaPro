import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    rollNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        sparse:true
    },
    class:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'class'
    },
    schoolCode:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female']
    },
    role:{
        type:String,
        default:"Student"
    },
    performance:{
        exams:[
            {
                subject:{
                    type:String,
                    required:true,
                },
                marks:{
                    type:Number,
                    required:true,
                },
                maxMarks:{
                    type:Number,
                    required:true,
                },
                examName:{
                    type:String,
                    required:true
                },
                date:{
                    type:Date,
                    required:true,
                    default:() => new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        ],
        overAllGrade:{
            type:String,
        }
    }
})

const StudentModel = mongoose.model('student',studentSchema);

export default StudentModel;