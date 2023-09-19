import express from 'express'
import mongoose from "mongoose";
import {loginValidation, registrationValidation, taskValidation} from './validation/validation.js'
import checkUser from './utils/checkUser.js'
import * as userController from "./controllers/userControllers.js";
import * as taskController from "./controllers/taskControllers.js";
import cors from "cors";

export const appServer = express();
appServer.use(express.json());
appServer.use(cors());

mongoose.connect('mongodb+srv://nikitavegas95:7412@cluster0.kyp5gki.mongodb.net/user?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

appServer.post('/', loginValidation, userController.login)
appServer.post('/registration', registrationValidation, userController.register)
appServer.get('/auth/me', checkUser, userController.getMe)

appServer.get('/tasks', taskController.getAll)
appServer.get('/task/:id', taskController.getOne)
appServer.post('/task',checkUser, taskValidation, taskController.create)
appServer.delete('/task/:id',checkUser, taskController.remove)
appServer.patch('/task/:id', taskController.update)

appServer.listen(7412, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Server OK');
});

