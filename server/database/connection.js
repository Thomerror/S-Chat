import mongoose from 'mongoose';

const connectDB = async()=>{
    try{
        //mongodb connection string
        const con = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${con.connection.host}`);
    }catch(err){
        console.log(err);
        provess.exit(1);
    }
}
export default connectDB;