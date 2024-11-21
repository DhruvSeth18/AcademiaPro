import mongoose, { connect } from "mongoose";

const connection = {};

const ConnectionToDatabase = async (username,password,database)=>{
    if(connection[connect]){
        return connection[connect];
    }
    try{
        const connect = await mongoose.createConnection(`mongodb+srv://${username}:${password}@cluster0.jb6pz7m.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`);
        connection[database] = connect;
        return connect;
    } catch(err){
        console.log("Connection Error " + err.message);
    }
}

export default ConnectionToDatabase;                       























































































