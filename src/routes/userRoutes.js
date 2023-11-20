import express from "express";
import UserController from "../controllers/userController.js";

const routes = express.Router();

routes.get("/users", UserController.listUsers);
routes.post("/login", UserController.userLogin);
routes.post("/users/register", UserController.userRegister);
routes.put("/users/update/:id", UserController.userUpdate);
routes.delete("/users/delete/:id", UserController.userDelete);

export default routes;