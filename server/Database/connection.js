import mongoose from "mongoose";

const ConnectionToDatabase = async (username,password,database)=>{
    try{
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.jb6pz7m.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("Connection is Successfull");
    } catch(err){
        console.log(err.message);
    }
}

export default ConnectionToDatabase;                       























































































