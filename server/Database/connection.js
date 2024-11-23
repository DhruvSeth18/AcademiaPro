import mongoose, { connect } from "mongoose";

const connection = {};

const ConnectionToDatabase = async (username,password,database)=>{
    if(connection[connect]){
        return connection[connect];
    }
    try{
        const connect = await mongoose.createConnection(`mongodb://localhost:27017/${database}`);
        connection[database] = connect;
        return connect;
    } catch(err){
        console.log("Connection Error " + err.message);
    }
}

export default ConnectionToDatabase;                       























































































