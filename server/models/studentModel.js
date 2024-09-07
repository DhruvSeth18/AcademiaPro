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
    SchoolCode:{
        type:Number,
        required:true,
    },
    gender:{
        type:String,
        enum:['male','female']
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
                date:{
                    type:Date,
                    required:true,
                }
            }
        ],
        overAllGrade:{
            type:String,
        },
        attendence:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'attendence'
        }
    }
})

const StudentModel = mongoose.model('student',studentSchema);

export default StudentModel;