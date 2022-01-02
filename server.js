import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import router from './server/routes/router.js';
import connectDB from './server/database/connection.js';

const app = express();
app.use(bodyParser.urlencoded({extended:false}));


//load resources
const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("view engine", "pug");
app.set("views",path.join(__dirname,"views"));
app.use("/css",express.static(path.join(__dirname,"resources/css"),{
    etag:true,
    cacheControl: true,
    maxAge: 8000
}));
// app.use("/img",express.static(path.resolve(__dirname,"/resources/img")));
// app.use("/js",express.static(path.resolve(__dirname,"/resources/js")));

dotenv.config({path:"config.env"});
const PORT = process.env.PORT||8080;

//log request
app.use(morgan("tiny"));

//mongoDB connection
connectDB();

//render homepage
app.use("/",router);

//load routers
app

app.listen(PORT,()=>{
    console.log(`Server is listening on port ${PORT}...`);
});

