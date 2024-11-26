import mongoose from "mongoose";

const SchoolHeadSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'Username must be of at least 3 character'],
        maxlength:[18,'Username must be of at max 6 character'],
        match: [ /^[a-zA-Z0-9_-]+$/, 'Username is invalid' ]
    },
    image:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
        minlength:[6,'Username must be of at least 3 character'],
        select:false,
    },
    country:{
        type:String,
        required:true,
        default:"India"
    },
    state:{
        type:String,
        required:true,
        default:"Pubjab"
    },
    schoolCode:{
        type:Number,
        required:true,
    },
    role:{
        type:String,
        required:true,
        default:"Head"
    }
});
const SchoolHead =(db)=> db.model("schoolhead",SchoolHeadSchema);
export default SchoolHead;