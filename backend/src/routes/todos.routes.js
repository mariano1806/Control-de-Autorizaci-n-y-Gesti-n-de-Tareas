import { Router } from "express";
import {getAllTodosCtrl,
        updateTodosCtrl,
        deleteTodosCtrl
} from "../controllers/todos.controllers.js";
import validarJwt from "../middlewares/validar-jwt.js";

const todosRouter = Router();

todosRouter.get("/",validarJwt, getAllTodosCtrl);//obtener todas las tareas del usuario autenticado

todosRouter.post("/",validarJwt, getAllTodosCtrl);//crear una nueva tarea del usuario autenticado

todosRouter.put("/:id",validarJwt, updateTodosCtrl);//actualizar una tarea del usuario autentidicado

todosRouter.delete("/:id",validarJwt, deleteTodosCtrl);//eliminar una tarea del usuario autentidicado

export { todosRouter };
