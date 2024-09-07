import ConnectionToDatabase from "../Database/connection.js";

export const ConnectionToSpecificDatabase= async (req,res,next)=>{
    try{
        if(req.headers.code){
            await ConnectionToDatabase(process.env.DB_username,process.env.DB_password,req.headers.code); 
            console.log("Database connected to " + req.headers.code);
        } else{
            return res.status(400).json({
                status:"fail",
                message:"No school Code found in req.headers"
            })
        }
        next();
    } catch(error){
        console.log(error.message);
        res.status(500).json({
            status:"fail",
            message:"Error while connecting to specific Database"
        })
    }
}
export const middlewareAuth = async (req,res,next)=>{
    try{
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return res.status(400).json({
                status: 'fail',
                message: 'No JWT token Found'
            })
        } 
        const ver = await promisify(jwt.verify)(token, process.env.secret_key);
        if (ver) {
            next();
        } else{
            res.status(401).json({
                status:'fail',
                message:'You Are not signed In Really'
            })
        }
    } catch(error){
        console.log(error.message);
        return res.status(401).json({
            status:'fail',
            message:'You Are not signed In'
        })
    }
}