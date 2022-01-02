import express from 'express';
import { homeRoutes, addUser, updateUser } from '../services/render.js';
import {create,find,update,Delete} from '../controller/controller.js';
const route = express.Router();

route.get("/",homeRoutes);

route.get("/add-user",addUser);

route.get("/update-user",updateUser);

//API
route.post("/api/users",create);
route.get("/api/users",find);
route.put("/api/users/:id",update);
route.delete("/api/users/:id",Delete);

export default route;